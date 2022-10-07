import numpy as np

from face_embedding.base_model.arcface.emb import arcface_embedding


def get_image_feature(img, landmarks):
    batch_size = 1

    files = [1]
    rare_size = len(files) % batch_size
    batch = 0
    img_feats = np.empty((len(files), 1024), dtype=np.float32)

    batch_data = np.empty((2 * batch_size, 3, 112, 112))
    for i in range(1):
        lmk = np.array(landmarks[0])
        input_blob = arcface_embedding.get(img, lmk)
        batch_data[2 * (i - batch * batch_size)][:] = input_blob[0]
        batch_data[2 * (i - batch * batch_size) + 1][:] = input_blob[1]
        if (i + 1) % batch_size == 0:
            img_feats[batch * batch_size:batch * batch_size + batch_size][:] = arcface_embedding.forward_db(batch_data)
            batch += 1

    batch_data = np.empty((2 * rare_size, 3, 112, 112))
    for img_index, each_line in enumerate(files[len(files) - rare_size:]):
        lmk = np.array(landmarks[0])
        input_blob = arcface_embedding.get(img, lmk)
        batch_data[2 * img_index][:] = input_blob[0]
        batch_data[2 * img_index + 1][:] = input_blob[1]
        if (img_index + 1) % rare_size == 0:
            img_feats[len(files) -
                      rare_size:][:] = arcface_embedding.forward_db(batch_data)
            batch += 1

    img_input_feats = img_feats[:, 0:img_feats.shape[1] // 2] + img_feats[:, img_feats.shape[1] // 2:]
    img_input_feats = img_input_feats / np.sqrt(np.sum(img_input_feats ** 2, -1, keepdims=True))
    return img_input_feats

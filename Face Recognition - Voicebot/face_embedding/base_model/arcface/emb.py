import cv2
import numpy as np
import torch
from skimage import transform as trans

from face_embedding.base_model.arcface.backbones import get_model
from face_embedding.utils.constants import ArcfaceConfig
from face_embedding.utils.download import base_file_download

base_file_download(ArcfaceConfig.model_path, ArcfaceConfig.url)
_net = get_model(ArcfaceConfig.model_name, fp16=True)
if torch.cuda.is_available():
    _net.load_state_dict(torch.load(ArcfaceConfig.model_path))
    model = torch.nn.DataParallel(_net, device_ids=[0])
    model.to(f'cuda:{model.device_ids[0]}')
    cuda_is_available = True
else:
    _net.load_state_dict(torch.load(ArcfaceConfig.model_path, map_location=torch.device('cpu')))
    model = torch.nn.DataParallel(_net)
    model.to(torch.device('cpu'))
    cuda_is_available = False
model.eval()


class Embedding(object):
    def __init__(self, data_shape, batch_size=1):
        image_size = (112, 112)
        self.image_size = image_size
        self.model = model
        src = np.array([
            [30.2946, 51.6963],
            [65.5318, 51.5014],
            [48.0252, 71.7366],
            [33.5493, 92.3655],
            [62.7299, 92.2041]], dtype=np.float32)
        src[:, 0] += 8.0
        self.src = src
        self.batch_size = batch_size
        self.data_shape = data_shape

    def get(self, rimg, landmark):

        assert landmark.shape[0] == 68 or landmark.shape[0] == 5
        assert landmark.shape[1] == 2
        if landmark.shape[0] == 68:
            landmark5 = np.zeros((5, 2), dtype=np.float32)
            landmark5[0] = (landmark[36] + landmark[39]) / 2
            landmark5[1] = (landmark[42] + landmark[45]) / 2
            landmark5[2] = landmark[30]
            landmark5[3] = landmark[48]
            landmark5[4] = landmark[54]
        else:
            landmark5 = landmark
        tform = trans.SimilarityTransform()
        tform.estimate(landmark5, self.src)
        M = tform.params[0:2, :]
        img = cv2.warpAffine(rimg,
                             M, (self.image_size[1], self.image_size[0]),
                             borderValue=0.0)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img_flip = np.fliplr(img)
        img = np.transpose(img, (2, 0, 1))  # 3*112*112, RGB
        img_flip = np.transpose(img_flip, (2, 0, 1))
        input_blob = np.zeros((2, 3, self.image_size[1], self.image_size[0]), dtype=np.uint8)
        input_blob[0] = img
        input_blob[1] = img_flip
        return input_blob

    @torch.no_grad()
    def forward_db(self, batch_data):
        imgs = torch.Tensor(batch_data)
        imgs = imgs.cuda() if cuda_is_available else imgs.cpu()
        imgs.div_(255).sub_(0.5).div_(0.5)
        feat = self.model(imgs)
        feat = feat.reshape([self.batch_size, 2 * feat.shape[1]])
        return feat.cpu().numpy()


arcface_embedding = Embedding(data_shape=(3, 112, 112))

from constants import Download
from face_detect.scrfd import SCRFD

_detector = SCRFD(
    model_file=Download.download_url["scrfd_face_detect"][0])
_detector.prepare(-1)


def scrfd_detect(img, is_have_threshold=False):
    bboxes, kps = _detector.detect(img, 0.6, input_size=(640, 640))

    w, h, _ = img.shape
    max_box = [0, None]
    for i in range(len(bboxes)):
        box = bboxes[i]
        if box[2] - box[0] > w / 5 and box[3] - box[1] > h / 5 or is_have_threshold:
            temp = (box[2] - box[0]) * (box[3] - box[1])
            if temp > max_box[0]:
                max_box = [temp, i]

    if max_box[0] > 0:
        return bboxes[max_box[1]:max_box[1] + 1], kps[max_box[1]:max_box[1] + 1]
    return [], []

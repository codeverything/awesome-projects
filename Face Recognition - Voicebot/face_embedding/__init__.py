import numpy as np

from face_embedding.base_model import get_image_feature
from face_embedding.utils import stringToRGB, convert_string_to_list


def arcface_inference(image, landmarks):
    features = []
    for landmark in landmarks:
        features.append(get_image_feature(image, [landmark])[0])
    features = np.array(features)
    return features

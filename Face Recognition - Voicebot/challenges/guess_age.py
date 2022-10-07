import pickle
from typing import Any

# import cv2
# import numpy as np
#
# from challenges.base_model import MobileNetV3Model
# from constants import Chatbot
from face_embedding import arcface_inference


# class GuessAge:
#     def __init__(self) -> None:
#         self.model = MobileNetV3Model(num_classes=104)
#         self.model.load_model("resources/model_age.h5")
#
#     def __call__(self, image, *args: Any, **kwds: Any) -> Any:
#         image = cv2.resize(image, (224, 224))
#         image = image.reshape((1, 224, 224, 3))
#         result = self.model.predict(image)[0]
#         print(np.argmax(result))
#         return Chatbot.age_classes[np.argmax(result)]


class GuessAgeKNN:
    def __init__(self) -> None:
        self.classifier = pickle.load(open("resources/age_mode.sav", 'rb'))

    def __call__(self, image, landmarks, *args: Any, **kwds: Any) -> Any:
        faces_encodings = arcface_inference(image, landmarks)
        pred = self.classifier.predict(faces_encodings)[0]
        return pred

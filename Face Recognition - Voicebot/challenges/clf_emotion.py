import pickle
from typing import Any

# import cv2
# import numpy as np
#
# from challenges.base_model import MobileNetV3Model
# from constants import Chatbot
from face_embedding import arcface_inference


# class EmotionDetect:
#     def __init__(self) -> None:
#         self.model = MobileNetV3Model(num_classes=7)
#         self.model.load_model("resources/model_emotion.h5")
#
#     def __call__(self, image, *args: Any, **kwds: Any) -> Any:
#         image = cv2.resize(image, (224, 224))
#         image = image.reshape((1, 224, 224, 3))
#         result = self.model.predict(image)
#         return Chatbot.emotions[np.argmax(result)]


class EmotionDetectKNN:
    def __init__(self) -> None:
        self.classifier = pickle.load(open("resources/emotion_model.sav", 'rb'))

    def __call__(self, image, landmarks, *args: Any, **kwds: Any) -> Any:
        faces_encodings = arcface_inference(image, landmarks)
        pred = self.classifier.predict(faces_encodings)[0]
        return pred

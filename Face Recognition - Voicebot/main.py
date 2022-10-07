import copy
import os
import random
import threading
import time

import cv2
import numpy as np
from PIL import ImageFont, ImageDraw, Image
from playsound import playsound

import face_detect
# from challenges.clf_emotion import EmotionDetectKNN
from challenges.guess_age import GuessAgeKNN
from constants import Chatbot
from face_clf import FaceRecognitionModel
from speech.speech_to_text import recognize_speech_from_mic
from speech.text_to_speech import TextToSpeech

os.environ["TOKENIZERS_PARALLELISM"] = "false"


class VoiceBot(object):
    def __init__(self):
        self.speak_duration = 0
        self.user_frame = None
        self.username = ""
        self.bbox = []
        self.landmark = []

    # def predict_emotion(self, emotion_detect: EmotionDetectKNN):
    #     while True:
    #         if len(self.landmark) > 0:
    #             self.user_emotion = emotion_detect(self.user_frame, self.landmark)

    def predict_bbox(self):
        while True:
            if self.user_frame is not None:
                self.bbox, self.landmark = face_detect.scrfd_detect(self.user_frame)

    def run_animate(self):
        vid_user = cv2.VideoCapture(0)
        while True:
            if self.speak_duration == 0:
                print(self.speak_duration)
                vid = cv2.VideoCapture("resources/animate_idle.mp4")
                while self.speak_duration == 0:
                    ret_user, self.user_frame = vid_user.read()
                    if ret_user:
                        draw_frame = copy.deepcopy(self.user_frame)
                        if len(self.bbox) > 0:
                            x1, y1, x2, y2, _ = self.bbox[0].astype(int)
                            draw_frame = cv2.rectangle(draw_frame, (x1, y1), (x2, y2), (255, 0, 0), 2)

                            if self.username:
                                fontpath = "resources/Catamaran-Medium.ttf"
                                font = ImageFont.truetype(fontpath, 32)
                                img_pil = Image.fromarray(draw_frame)
                                draw = ImageDraw.Draw(img_pil)
                                draw.text((x1, y1 - 40), self.username, font=font, fill=(0, 255, 0))
                                draw_frame = np.array(img_pil)

                        cv2.imshow("User", draw_frame)

                    ret, frame = vid.read()
                    if ret:
                        cv2.imshow("Bot", frame)
                        if cv2.waitKey(25) & 0xFF == ord('q'):
                            break
                    else:
                        vid = cv2.VideoCapture("resources/animate_idle.mp4")
                vid.release()

            if self.speak_duration > 0:
                vid = cv2.VideoCapture("resources/animate_speak.mp4")
                t1 = threading.Thread(target=playsound, args=("welcome.mp3",))
                t1.start()
                now = time.time()
                while time.time() - now < self.speak_duration:
                    ret_user, self.user_frame = vid_user.read()
                    if ret_user:
                        draw_frame = copy.deepcopy(self.user_frame)
                        if len(self.bbox) > 0:
                            x1, y1, x2, y2, _ = self.bbox[0].astype(int)
                            draw_frame = cv2.rectangle(draw_frame, (x1, y1), (x2, y2), (0, 0, 255), 2)

                            if self.username:
                                fontpath = "resources/Catamaran-Medium.ttf"
                                font = ImageFont.truetype(fontpath, 32)
                                img_pil = Image.fromarray(draw_frame)
                                draw = ImageDraw.Draw(img_pil)
                                draw.text((x1, y1 - 40), self.username, font=font, fill=(0, 255, 0))
                                draw_frame = np.array(img_pil)

                        cv2.imshow("User", draw_frame)

                    ret, frame = vid.read()
                    if ret:
                        cv2.imshow("Bot", frame)
                        if cv2.waitKey(25) & 0xFF == ord('q'):
                            break
                    else:
                        vid = cv2.VideoCapture("resources/animate_speak.mp4")

                self.speak_duration = 0
                t1.join()
                vid.release()

    def run_voicebot(self):
        tts = TextToSpeech()

        face_recognition = FaceRecognitionModel()

        guess_age = GuessAgeKNN()

        thread_animate = threading.Thread(target=self.run_animate)
        thread_animate.start()

        thread_bbox = threading.Thread(target=self.predict_bbox)
        thread_bbox.start()

        # emotion_detect = EmotionDetectKNN()
        # thread_emotion = threading.Thread(target=self.predict_emotion, args=(emotion_detect,))
        # thread_emotion.start()

        list_response_default = ["Chào bạn xinh đẹp, bạn tên là gì vậy?", "Bạn nói gì, nói lại xem",
                                 "Mọi người đâu hết rồi"]
        while True:
            frame_predict_name = copy.deepcopy(self.user_frame)
            if len(self.bbox) > 0:
                is_have_human = [True, time.time()]
                user_name = face_recognition.predict(frame_predict_name, self.landmark)
                if len(user_name) > 0:
                    self.username = user_name[:user_name.find('_')]
                    self.speak_duration = tts(
                        f"Bạn {self.username} này, tránh ra cho người khác chơi nào")
                    time.sleep(self.speak_duration + 2)

                if len(user_name) == 0 and is_have_human[0]:
                    self.speak_duration = tts(list_response_default[0])
                    while True:
                        time.sleep(self.speak_duration)
                        guess = recognize_speech_from_mic()

                        if guess['error'] is None:
                            message = guess["transcription"]
                            print("User: " + message)

                            user_name = face_recognition.add_user(message, frame_predict_name)
                            if len(user_name) == 0:
                                self.speak_duration = tts(list_response_default[1])
                                continue

                            self.username = user_name[:user_name.find('_')]
                            self.speak_duration = tts(
                                f"Chào bạn {self.username}, tôi nhớ bạn rồi đấy!")

                            time.sleep(self.speak_duration + 1)
                            self.speak_duration = tts("Giờ tôi sẽ đoán tuổi bạn, tút tút tút")
                            time.sleep(1)

                            # age
                            response = random.choice(Chatbot.age_messages)
                            age = guess_age(self.user_frame, self.landmark)
                            self.speak_duration = tts(response.format(int(age)))
                            time.sleep(2)

                            # self.__init__()
                            break
                        else:
                            if len(self.bbox) > 0:
                                is_have_human = [True, time.time()]
                                if int(time.time()) % 3:
                                    self.speak_duration = tts(list_response_default[1])
                            else:
                                if time.time() - is_have_human[1] > 10:
                                    self.speak_duration = tts(list_response_default[2])
                                    break


if __name__ == '__main__':
    VoiceBot().run_voicebot()

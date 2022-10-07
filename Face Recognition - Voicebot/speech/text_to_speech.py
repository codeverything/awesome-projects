import os
from typing import Any

from gtts import gTTS


def get_length(filename):
    from mutagen.mp3 import MP3
    audio = MP3(filename)
    return audio.info.length


class TextToSpeech:
    language = 'vi'

    def __init__(self) -> None:
        pass

    def __call__(self, mytext, *args: Any, **kwds: Any) -> Any:
        print("Bot: " + mytext)
        myobj = gTTS(text=mytext, lang=self.language, slow=False)

        mp3_name = "welcome.mp3"
        os.remove(mp3_name)
        myobj.save(mp3_name)
        return get_length(mp3_name)

import ast
import base64
import io

import numpy as np
from PIL import Image


def read_image_byte(image_byte):
    image = Image.open(io.BytesIO(image_byte))
    if image.mode != 'RGB':
        image = image.convert('RGB')
    image = np.asarray(image)
    return image


def stringToRGB(base64_string):
    img = base64.b64decode(str(base64_string))
    return read_image_byte(img)


def convert_string_to_list(coordinates: str):
    coordinates = coordinates.replace(" ", "")
    try:
        return ast.literal_eval(coordinates)
    except:
        raise ValueError(
            'coordinates is string of list, example: "[[1,2,3,4],[1,2,3,4]]"'
        )


def pillow_convert_base64(image):
    image = Image.fromarray(np.array(image))
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())
    img_str = str(img_str)[2:-1]
    return img_str

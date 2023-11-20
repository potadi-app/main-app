from keras.utils import img_to_array
from PIL import Image
from io import BytesIO
from potadi.settings.settings import MODEL
import numpy as np

ALLOWED_EXTENSIONS = set(['jpg', 'png', 'jpeg', 'JPG', 'PNG', 'JPEG'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

def predict(file):
    # img  = load_img(file, target_size=(150, 150))
    img  = Image.open(BytesIO(file)).convert("RGB")
    img = img.resize((150, 150))
    img = img_to_array(img)
    img = np.expand_dims(img, axis=0)
    probs = MODEL.predict(img)[0]
    output = {'Early Blight': probs[0], 'Healthy': probs[1], 'Late Blight': probs[2]}

    return output
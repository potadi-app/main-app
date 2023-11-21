from keras.utils import img_to_array
from PIL import Image
from io import BytesIO
from potadi.settings.settings import BASE_DIR
from keras.models import load_model
import numpy as np

ALLOWED_EXTENSIONS = set(['jpg', 'png', 'jpeg', 'JPG', 'PNG', 'JPEG'])

MODEL = load_model(f'{BASE_DIR}/app/ml/model/model.h5')
MODEL.load_weights(f'{BASE_DIR}/app/ml/model/weight.h5')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

def predict(file):
    try:
        img = Image.open(BytesIO(file)).convert("RGB")
        img = img.resize((150, 150))
        img = img_to_array(img)
        img = np.expand_dims(img, axis=0)
        # print(f"Image shape after preprocessing: {img.shape}")
        
        probs = MODEL.predict(img)[0]
        # print(f"Model prediction probabilities: {probs}")
        
        output = {'Early Blight': probs[0], 'Healthy': probs[1], 'Late Blight': probs[2]}
        return output
    except Exception as e:        
        return {'error': e, 'message': 'Reload and try again or call our support team.'}
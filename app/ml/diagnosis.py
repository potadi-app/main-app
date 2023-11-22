from keras.utils import img_to_array
from PIL import Image
from io import BytesIO
from potadi.settings.settings import BASE_DIR
import numpy as np

ALLOWED_EXTENSIONS = set(['jpg', 'png', 'jpeg', 'JPG', 'PNG', 'JPEG'])
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

def load_model():
    from keras.models import load_model

    MODEL = load_model(f'{BASE_DIR}/app/ml/model/model-1.h5')
    MODEL.load_weights(f'{BASE_DIR}/app/ml/model/weight-1.h5')
    return MODEL    


def predict(file):
    try:
        model = load_model()
        img = Image.open(BytesIO(file)).convert("RGB")
        img = img.resize((224, 224))
        img = img_to_array(img)
        img = np.expand_dims(img, axis=0)
        
        probs = model.predict(img)[0]
        
        output = {'Early Blight': probs[0], 'Healthy': probs[1], 'Late Blight': probs[2]}
        return output
    except Exception as e:
        return {'error': str(e), 'message': 'An error occurred. Please check the input and try again.'}

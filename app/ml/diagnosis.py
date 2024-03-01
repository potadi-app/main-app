from keras.utils import img_to_array
from PIL import Image
from io import BytesIO
from potadi.settings.settings import BASE_DIR
from keras.models import load_model
import numpy as np

ALLOWED_EXTENSIONS = set(['jpg', 'png', 'jpeg', 'JPG', 'PNG', 'JPEG'])
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

model = load_model(f'{BASE_DIR}/app/ml/model/model_MobileNet_imagenet_New_224.h5')
model.load_weights(f'{BASE_DIR}/app/ml/model/weights_MobileNet_imagenet_New_224.h5')

def predict(file):
    try:
        img = Image.open(BytesIO(file)).convert("RGB")
        img = img.resize((224, 224))
        img = img_to_array(img)
        img = np.expand_dims(img, axis=0)
        
        probs = model.predict(img)[0]
        
        output = {'Early Blight': round(probs[0]*100, 2), 'Healthy': round(probs[1]*100, 2), 'Late Blight': round(probs[2]*100, 2)}
        return output
    except Exception as e:
        return {'error': str(e), 'message': 'An error occurred. Please check the input and try again.'}

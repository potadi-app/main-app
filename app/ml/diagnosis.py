from keras.utils import img_to_array
from PIL import Image
from io import BytesIO
from .__init__ import MODEL
import numpy as np

ALLOWED_EXTENSIONS = set(['jpg', 'png', 'jpeg', 'JPG', 'PNG', 'JPEG'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

def predict(file):
    try:
        img = Image.open(BytesIO(file)).convert("RGB")
        img = img.resize((224, 224))
        img = img_to_array(img)
        img = np.expand_dims(img, axis=0)
        # print(f"Image shape after preprocessing: {img.shape}")
        
        probs = MODEL.predict(img)[0]
        # print(f"Model prediction probabilities: {probs}")
        
        output = {'Early Blight': probs[0], 'Healthy': probs[1], 'Late Blight': probs[2]}
        return output
    except Exception as e:        
        return {'error': e, 'message': 'Reload and try again or call our support team.'}
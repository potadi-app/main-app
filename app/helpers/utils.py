from app.models import Users, ImageHistory
from django.conf import settings
from os.path import basename
import json
import os

def get_user_data(request):
    email = request.session.get('email')
    username = request.session.get('username')
    profile_picture = request.session.get('profile_picture')
    data = {
        'username': username,
        'email': email,
        'profile_picture': profile_picture
    }
    return data

def get_history(request):
    email = request.session.get('email')
    histories = ImageHistory.objects.filter(user_email=email).order_by('-upload_date')
    history = []
    
    for historie in histories:
        history.append({
            'id': historie.id,
            'label': historie.label,
            'confident': historie.confident,
            'filename': basename(historie.image_data.name),
            'image_data': historie.image_data.url,
            'upload_date': historie.upload_date,
            'detail': historie.detail
        })
    
    return history

def detail_diagnose(item_id, email):
    try:
        history = ImageHistory.objects.get(user_email=email, id=item_id)
        detail = {
        'id': history.id,
        'label': history.label,
        'confident': history.confident,
        'filename': basename(history.image_data.name),
        'image_data': history.image_data.url,
        'upload_date': history.upload_date,
        'detail': json.loads(history.detail)
        }
        return detail
    except ImageHistory.DoesNotExist:
        return None
    
   

def get_total_history(request):
    email = request.session.get('email')
    total = ImageHistory.objects.filter(user_email=email).count()
    return total

def serve_images():
    healthy_image = os.path.join(settings.BASE_DIR, 'app/static/assets/media/sample_diseases/healthy')
    early_image = os.path.join(settings.BASE_DIR, 'app/static/assets/media/sample_diseases/early_blight')
    late_image = os.path.join(settings.BASE_DIR, 'app/static/assets/media/sample_diseases/late_blight')
    healthy_image_names = [f for f in os.listdir(healthy_image) if os.path.isfile(os.path.join(healthy_image, f))]
    early_image_names = [f for f in os.listdir(early_image) if os.path.isfile(os.path.join(early_image, f))]
    late_image_names = [f for f in os.listdir(late_image) if os.path.isfile(os.path.join(late_image, f))]
    return healthy_image_names, early_image_names, late_image_names
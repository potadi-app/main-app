from app.models import Users, ImageHistory
from os.path import basename

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
            'upload_date': historie.upload_date
        })
    
    return history

def get_total_history(request):
    email = request.session.get('email')
    total = ImageHistory.objects.filter(user_email=email).count()
    return total
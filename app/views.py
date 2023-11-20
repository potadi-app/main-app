from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .helpers.decorator import login_required
from .helpers.utils import get_user_data
from app.models import Users, ImageHistory
from app.ml.diagnosis import predict
from os.path import basename
import numpy as np

@login_required
def home(request):
    data = get_user_data(request)
    return render(request, 'dashboard/index.html', {'data': data})

@login_required
def diagnosis(request):
    labels=['Early Blight', 'Healthy', 'Late Blight']

    if request.method == 'GET':
        data = get_user_data(request)
        return render(request, 'diagnosis/diagnosis.html', {'data': data})
    
    elif request.method == 'POST':
        image_file = request.FILES.get('image_file')

        if image_file is None:
            return JsonResponse({'status': 'error', 'message': 'No image file found'})
        else:
            try:
                
                image_data = image_file.read()
                diagnosis = predict(image_data)
                y_pred = np.argmax(list(diagnosis.values()))
                conf_lvl = round(diagnosis[labels[y_pred]]*100, 2)             

                user_email = request.session.get('email')              
                            
                image_history = ImageHistory.objects.create(
                    label=labels[y_pred],
                    confident=conf_lvl,
                    image_data=image_file,
                    user_email=user_email
                )
                image_history.save()                

                get_image = ImageHistory.objects.get(id=image_history.id)
                filename = get_image.image_data.name
                image_url = get_image.image_data.url
                dateTaken = get_image.upload_date
                result = {
                    'status': 200,
                    'message': 'Diagnosis success',
                    'data': {
                        'filename': basename(filename),
                        'label': labels[y_pred],
                        'confident': conf_lvl,
                        'dateTaken': dateTaken,
                        'image_file': image_url,
                    }
                }
                
                data = get_user_data(request)
                return render(request, 'diagnosis/diagnosis.html', {'data': data, 'result': result})
            except Exception as e:
                print(e)
                return JsonResponse({'status': 'error', 'message': 'Error while diagnosing image'})
            

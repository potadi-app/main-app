from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_POST
from .helpers.decorator import login_required
from .helpers.utils import get_user_data, get_history, get_total_history
from app.models import Users, ImageHistory
# from app.ml.diagnosis import predict
from os.path import basename
import numpy as np
import json

@login_required
def home(request):
    data = get_user_data(request)
    return render(request, 'dashboard/index.html', {'data': data})

# @login_required
# def diagnosis(request):
#     labels=['Early Blight', 'Healthy', 'Late Blight']

#     if request.method == 'GET':
#         data = get_user_data(request)
#         return render(request, 'diagnosis/diagnosis.html', {'data': data})
    
#     elif request.method == 'POST':
#         image_file = request.FILES.get('image_file')

#         if image_file is None:
#             return JsonResponse({'status': 'error', 'message': 'No image file found'})
#         else:
#             try:
                
#                 image_data = image_file.read()
#                 diagnosis = predict(image_data)
#                 y_pred = np.argmax(list(diagnosis.values()))
#                 conf_lvl = round(diagnosis[labels[y_pred]]*100, 2)             

#                 user_email = request.session.get('email')              
                            
#                 image_history = ImageHistory.objects.create(
#                     label=labels[y_pred],
#                     confident=conf_lvl,
#                     image_data=image_file,
#                     user_email=user_email
#                 )
#                 image_history.save()                

#                 get_image = ImageHistory.objects.get(id=image_history.id)
#                 filename = get_image.image_data.name
#                 image_url = get_image.image_data.url
#                 dateTaken = get_image.upload_date
#                 result = {
#                     'status': 200,
#                     'message': 'Diagnosis success',
#                     'data': {
#                         'filename': basename(filename),
#                         'label': labels[y_pred],
#                         'confident': conf_lvl,
#                         'dateTaken': dateTaken,
#                         'image_file': image_url,
#                     }
#                 }
                
#                 data = get_user_data(request)
#                 return render(request, 'diagnosis/diagnosis.html', {'data': data, 'result': result})
#             except Exception as e:
#                 print(e)
#                 return JsonResponse({'status': 'error', 'message': 'Error while diagnosing image'})
            
@login_required
def history(request):
    data = get_user_data(request)
    history = get_history(request)
    return render(request, 'history/history.html', {'data': data, 'history': history})

@login_required
def delete_history(request, id):
    if request.method == 'DELETE':
        try:
            image_history = ImageHistory.objects.get(id=id)
            image_history.delete()
            return JsonResponse({'status': 200, 'message': 'History deleted'})
        except ImageHistory.DoesNotExist:
            return JsonResponse({'status': 404, 'message': 'History not found'})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'Error while deleting history'})
        
@login_required
@require_POST
def delete_sel_history(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        ids = data.get('ids', [])
        if not ids:
            return JsonResponse({'status': 400, 'message': 'No IDs provided'})

        if len(ids) == 1:            
            image_history = ImageHistory.objects.get(id=ids[0])
            image_history.delete()            
        else:            
            ImageHistory.objects.filter(id__in=ids).delete()

        return JsonResponse({'status': 200, 'message': 'Berhasil menghapus data'})
    except ImageHistory.DoesNotExist:
        return JsonResponse({'status': 404, 'message': 'History not found'})
    except Exception as e:
        print(e)
        return JsonResponse({'status': 'error', 'message': 'Error while deleting history'})
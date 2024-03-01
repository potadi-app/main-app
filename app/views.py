from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse, FileResponse
from django.views.decorators.http import require_POST
from .helpers.decorator import login_required
from .helpers.utils import get_user_data, get_history, get_total_history, detail_diagnose, serve_images
from app.models import Users, ImageHistory
from app.ml.diagnosis import predict
from os.path import basename
from django.views.decorators.cache import cache_page
from django.core.cache import cache
import numpy as np
import json
import os

@cache_page(60 * 60)
@login_required
def home(request):
    data = cache.get('user_data')

    if data is None:
        data = get_user_data(request)
        cache.set('user_data', data, 60 * 60)        
    
    return render(request, 'dashboard/index.html', {'data': data})

@login_required
def diagnosis(request):
    labels=['Early Blight', 'Healthy', 'Late Blight']

    if request.method == 'GET':
        data = cache.get('user_data')
        
        if data is None:
            data = get_user_data(request)
            cache.set('user_data', data, 60 * 60)        

        images_data = cache.get('images_data')

        if images_data is None:        
            healthy_images, early_images, late_images = serve_images()

            images_data = {
                'healthy_images': healthy_images,
                'early_images': early_images,
                'late_images': late_images
            }
            cache.set('images_data', images_data, 60 * 60)

        else:
            healthy_images = images_data['healthy_images']
            early_images = images_data['early_images']
            late_images = images_data['late_images']
            
        return render(request, 'diagnosis/diagnosis.html', {'data': data, 'healthy_images': healthy_images, 'early_images': early_images, 'late_images': late_images})
    
    elif request.method == 'POST':
        image_file = request.FILES.get('image_file')

        if image_file is None:
            return JsonResponse({'status': 'error', 'message': 'No image file found'})
        else:
            try:
                
                image_data = image_file.read()
                diagnosis = predict(image_data)
                y_pred = np.argmax(list(diagnosis.values()))
                conf_lvl = diagnosis[labels[y_pred]]

                user_email = request.session.get('email')              
                            
                image_history = ImageHistory.objects.create(
                    label=labels[y_pred],
                    confident=conf_lvl,
                    image_data=image_file,
                    user_email=user_email,
                    detail=json.dumps(diagnosis)
                )
                                
                filename = image_history.image_data.name
                image_url = image_history.image_data.url
                dateTaken = image_history.upload_date
                result = {
                    'status': 200,
                    'message': 'Diagnosis success',
                    'data': {
                        'filename': basename(filename),
                        'label': labels[y_pred],
                        'confident': {
                            'healthy': diagnosis['Healthy'],
                            'early_blight': diagnosis['Early Blight'],
                            'late_blight': diagnosis['Late Blight'],
                        },
                        'dateTaken': dateTaken,
                        'image_file': image_url,
                    }
                }
                data = get_user_data(request)
                return render(request, 'diagnosis/diagnosis.html', {'data': data, 'result': result})
                
            except Exception as e:
                print(e)
                return JsonResponse({'status': 'error', 'message': str(e)})
            
@login_required
def history(request, id=None):
    if id:
        email = request.session.get('email')
        detail = detail_diagnose(email=email, item_id=id)
        return JsonResponse({'status': 200, 'data': detail})
    else:
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
    
from django.http import FileResponse

# @login_required
def download_sample_img(request, filename):
    if 'healthy' in filename.lower():
        DIR = 'app/static/assets/media/sample_diseases/healthy'
    elif 'early' in filename.lower():
        DIR = 'app/static/assets/media/sample_diseases/early_blight'
    elif 'late' in filename.lower():
        DIR = 'app/static/assets/media/sample_diseases/late_blight'
    else:
        return JsonResponse({'status': 'error', 'message': 'Error while downloading image'})
    
    try:
        filepath = os.path.join(settings.BASE_DIR, DIR, filename)
        
        # Buka file dan baca isinya
        with open(filepath, 'rb') as f:
            content = f.read()

            response = HttpResponse(content, content_type='image/jpeg')
            response['Content-Disposition'] = 'attachment; filename=' + os.path.basename(filepath)

            return response
    except Exception as e:
        print(e)
        return JsonResponse({'status': 'error', 'message': 'Error while downloading image'})

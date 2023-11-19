from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .helpers.decorator import login_required

@login_required
def home(request):
    email = request.session.get('email')
    username = request.session.get('username')
    profile_picture = request.session.get('profile_picture')
    data = {
        'username': username,
        'email': email,
        'profile_picture': profile_picture
    }
    return render(request, 'dashboard/index.html', {'data': data})
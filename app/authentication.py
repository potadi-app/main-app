from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.contrib import messages
from django.http import JsonResponse
from .helpers.decorator import cek_login
from .models import Users
from allauth.socialaccount.models import SocialAccount
from django.views.decorators.cache import cache_page

# @cache_page(604800)
@cek_login
def login(request):
    if request.method == 'GET':
        return render(request, 'auth/login.html')
    
    elif request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        if not email or not password:
            return JsonResponse({'success': False, 'message': 'Email dan password harus diisi!'})

        user = Users.objects.filter(email=email).first()

        if not user:
            return JsonResponse({'success': False, 'message': 'Email belum terdaftar!'})
        
        if not check_password(password, user.password):
            return JsonResponse({'success': False, 'message': 'Password salah!'})
        
        request.session['email'] = user.email
        request.session['username'] = user.username
        request.session['profile_picture'] = user.avatar.url

        return JsonResponse({'success': True, 'message': f'Selamat Datang {user.username}!'})
    
    else:
        return JsonResponse({'success': False, 'message': 'Metode tidak diizinkan'})

@cache_page(604800)
def register(request):
    if request.method == 'GET':
        return render(request, 'auth/register.html')
    
    elif request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        if not (username and email and password):
            return JsonResponse({'success': False, 'message': 'Semua field harus diisi!'})
        
        user = Users.objects.filter(email=email).first()
        user_provider_google = SocialAccount.objects.filter(user__email=email, provider='google').first()

        if user or user_provider_google:
            return JsonResponse({'success': False, 'message': 'Email sudah terdaftar!'})
        
        Users.objects.create(username=username, email=email, password=password)

        request.session['email'] = email
        request.session['username'] = username
        request.session['profile_picture'] = '/media/avatars/default.png'

        return JsonResponse({'success': True, 'message': 'Berhasil mendaftar!'})

    else:
        return JsonResponse({'success': False, 'message': 'Metode tidak diizinkan'})
    
def forgot_password(request):
    if request.method == 'GET':
        return render(request, 'auth/forgot.html')
    
    elif request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        if email and password:
            user = Users.objects.filter(email=email).first()

            if user:
                user.password = password
                user.save()
                return JsonResponse({'success': True, 'message': 'Password berhasil diubah!'})
            else:
                return JsonResponse({'success': False, 'message': 'Email belum terdaftar!'})
        else:
            return JsonResponse({'success': False, 'message': 'Email dan password harus diisi!'})
    
    else:
        return JsonResponse({'success': False, 'message': 'Metode tidak diizinkan'})

def logout(request):
    if request.method == 'GET':
        request.session.flush()
        return redirect('login')

def login_success(request):
    if request.user.is_authenticated and request.user.socialaccount_set.filter(provider='google').exists():
        social_account = SocialAccount.objects.get(user=request.user, provider='google')
        
        request.session['username'] = social_account.extra_data.get('name', '')
        request.session['email'] = social_account.extra_data.get('email', '')
        request.session['profile_picture'] = social_account.extra_data.get('picture', '')
        
        return redirect('home')
    else:
        return redirect('login') 
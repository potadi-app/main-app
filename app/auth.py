from django.shortcuts import redirect, render
from django.contrib.auth.hashers import check_password
from django.contrib import messages
from django.http import HttpResponse
from .models import Users

def login(request):
    if request.method == 'GET':
        return render(request, 'auth/login.html')
    
    elif request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        if email and password:
            user = Users.objects.filter(email=email).first()

            if user:
                if check_password(password, user.password):
                    request.session['email'] = user.email
                    return redirect('home')
                else:
                    messages.error(request, 'Ups, Password salah!')
                    return redirect('login')
            else:
                messages.error(request, 'Email belum terdaftar!')
                return redirect('login')
        else:
            messages.error(request, 'Email dan password harus diisi!')
            return render(request, 'auth/login.html')
    
    else:
        return HttpResponse('Method not allowed')


def register(request):
    if request.method == 'GET':
        return render(request, 'auth/register.html')

def forgot_password(request):
    if request.method == 'GET':
        return render(request, 'auth/forgot.html')
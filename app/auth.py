from django.shortcuts import render
from django.contrib.auth.hashers import make_password

def login(request):
    if request.method == 'GET':
        return render(request, 'auth/login.html')

def register(request):
    if request.method == 'GET':
        return render(request, 'auth/register.html')

def forgot_password(request):
    if request.method == 'GET':
        return render(request, 'auth/forgot.html')
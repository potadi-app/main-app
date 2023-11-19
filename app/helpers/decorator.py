from django.shortcuts import redirect
from django.urls import reverse
from app.models import Users
from functools import wraps

def login_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if 'email' in request.session:
            return view_func(request, *args, **kwargs)
        else:
            return redirect('login')

    return wrapper

def cek_login(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if 'email' in request.session:
            return redirect('home')
        else:
            return view_func(request, *args, **kwargs)
    return wrapper
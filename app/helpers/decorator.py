from django.shortcuts import redirect
from django.http import HttpResponse
from django.urls import reverse
from functools import wraps

def user_must_be_registered(view_func):
    def wrapper(request, *args, **kwargs):
        if 'email' in request.session:
            return view_func(request, *args, **kwargs)        
        else:
            return redirect(reverse('login'))
    return wrapper
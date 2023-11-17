from django.shortcuts import render
from django.http import HttpResponse
from .helpers.decorator import user_must_be_registered

@user_must_be_registered
def home(request):
    return HttpResponse('Hello World!')
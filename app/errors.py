from django.shortcuts import render

def not_found(request, exception=None, requested_url=None):
    return render(request, 'errors/not_found.html')
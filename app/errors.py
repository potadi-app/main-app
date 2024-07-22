from django.shortcuts import render

def not_found(request, exception):
    return render(request, 'errors/not_found.html', status=404)
from django.shortcuts import render
from django.views.decorators.cache import cache_page

cache_page(60 * 60)
def not_found(request, exception=None, requested_url=None):
    return render(request, 'errors/not_found.html')
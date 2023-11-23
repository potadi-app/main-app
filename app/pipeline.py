# di file yang berbeda, misalnya pipelines.py
from allauth.socialaccount import app_settings
from allauth.socialaccount.helpers import complete_social_login
from django.shortcuts import redirect
from django.http import HttpResponse
from django.dispatch import receiver
from allauth.socialaccount.signals import pre_social_login
from django.shortcuts import redirect

@receiver(pre_social_login)
def superuser_check(sender, request, sociallogin, **kwargs):
    if sociallogin.is_existing:
        user = sociallogin.user
        return HttpResponse('halaman_tidak_diizinkan')

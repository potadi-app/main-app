# di file yang berbeda, misalnya pipelines.py
from allauth.socialaccount import app_settings
from allauth.socialaccount.helpers import complete_social_login
from allauth.socialaccount.models import SocialLogin, SocialAccount
from allauth.account.models import EmailAddress
from allauth.account.utils import perform_login
from django.shortcuts import redirect
from django.http import HttpResponse

def superuser_check(request, sociallogin):
    # Pastikan pengguna bukan superuser
    if sociallogin.is_existing:
        user = sociallogin.user
        if user.is_superuser:
            return HttpResponse('halaman tidak diizinkan')

    return complete_social_login(request, sociallogin)

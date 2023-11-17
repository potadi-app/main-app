from .settings import *

DEBUG = True
STATIC_ROOT = os.path.join(BASE_DIR, 'app/static')
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'potadi_db',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
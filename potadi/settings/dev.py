from .settings import *

DEBUG = True
STATIC_ROOT = os.path.join(BASE_DIR, 'app/static')

INTERNAL_IPS = [
    '127.0.0.1'
    ]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'potadi_db',
        'USER': 'root',
        'PASSWORD': 'mysql',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
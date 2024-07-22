from .settings import *

ALLOWED_HOSTS = ['*']

DEBUG = True
STATIC_ROOT = os.path.join(BASE_DIR, 'app/static')

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
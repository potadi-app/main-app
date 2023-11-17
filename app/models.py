from collections.abc import Iterable
from django.db import models
from django.contrib.auth.hashers import make_password

# Create your models here.
class Users(models.Model):
    email = models.EmailField(primary_key=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email

class ImageHistory(models.Model):
    id = models.AutoField(primary_key=True)
    filename = models.CharField(max_length=100)
    label = models.CharField(max_length=100)
    confident = models.FloatField()
    upload_date = models.DateTimeField(auto_now_add=True)
    image_data = models.ImageField(upload_to='images-history/')
    user_email = models.ForeignKey(Users, to_field='email', on_delete=models.CASCADE)

    def __str__(self):
        return self.filename
from django.db import models
from django.contrib.auth.hashers import make_password
from django.db.models.signals import pre_delete
from django.dispatch import receiver

# Create your models here.
class Users(models.Model):
    email = models.EmailField(primary_key=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.png')

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name_plural = 'Users'
        

class ImageHistory(models.Model):
    id = models.AutoField(primary_key=True)
    label = models.CharField(max_length=100)
    confident = models.FloatField()
    upload_date = models.DateTimeField(auto_now_add=True)
    image_data = models.ImageField(upload_to='images-history/')
    user_email = models.CharField(max_length=255)

    def __str__(self):
        return self.user_email
    

    class Meta:
        verbose_name_plural = 'Image History'
    
@receiver(pre_delete, sender=ImageHistory)
def delete_image(sender, instance, **kwargs):
    instance.image_data.delete(save=False)
from django.apps import AppConfig


class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'
    
    # def ready(self):
    #     from allauth.account.signals import user_signed_up
    #     from django.dispatch import receiver

    #     @receiver(user_signed_up)
    #     def user_signed_up_handler(request, user, **kwargs):
    #         # Periksa apakah pengguna sudah memiliki username
    #         if not user.username:
    #             # Jika tidak, buat username dari bagian sebelum '@' pada alamat email
    #             username = user.email.split('@')[0]
    #             user.username = username
    #             user.save()

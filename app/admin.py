from django.contrib import admin
from .models import Users, ImageHistory
# Register your models here.

class ImageHistoryView(admin.ModelAdmin):
    list_display = ('user_email', 'image_data', 'upload_date')
    list_filter = ('user_email', 'upload_date')
    order_by = ('upload_date',)

admin.site.register(Users)
admin.site.register(ImageHistory, ImageHistoryView)
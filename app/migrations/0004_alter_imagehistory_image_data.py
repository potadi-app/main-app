# Generated by Django 4.2.7 on 2023-11-22 07:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_alter_imagehistory_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagehistory',
            name='image_data',
            field=models.ImageField(upload_to='images-history/<django.db.models.fields.CharField>/'),
        ),
    ]

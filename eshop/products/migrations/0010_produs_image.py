# Generated by Django 4.1.5 on 2023-02-15 13:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0009_remove_produs_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='produs',
            name='image',
            field=models.ImageField(default='', null=True, upload_to='media/products'),
        ),
    ]

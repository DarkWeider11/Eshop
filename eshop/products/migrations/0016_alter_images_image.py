# Generated by Django 4.1.6 on 2023-02-21 12:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0015_alter_produs_subcategoriestype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='images',
            name='image',
            field=models.ImageField(default='', null=True, upload_to='static/products'),
        ),
    ]

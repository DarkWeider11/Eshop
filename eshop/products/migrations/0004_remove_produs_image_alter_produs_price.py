# Generated by Django 4.1.5 on 2023-02-15 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_rename_product_images_produs'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='produs',
            name='image',
        ),
        migrations.AlterField(
            model_name='produs',
            name='price',
            field=models.PositiveSmallIntegerField(null=True),
        ),
    ]

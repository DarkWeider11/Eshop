# Generated by Django 4.1.5 on 2023-02-15 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_remove_produs_image_alter_produs_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='produs',
            name='price',
            field=models.PositiveSmallIntegerField(default=1),
            preserve_default=False,
        ),
    ]

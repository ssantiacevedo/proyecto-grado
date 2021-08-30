# Generated by Django 3.1 on 2021-08-30 22:12

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapping', '0003_auto_20210810_2034'),
    ]

    operations = [
        migrations.AddField(
            model_name='mappingprocess',
            name='steps_amount',
            field=models.IntegerField(default=2, validators=[django.core.validators.MaxValueValidator(10), django.core.validators.MinValueValidator(1)]),
        ),
    ]

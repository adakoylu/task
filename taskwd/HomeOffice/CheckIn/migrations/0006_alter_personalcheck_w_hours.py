# Generated by Django 3.2.8 on 2021-10-07 11:51

import computed_property.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('CheckIn', '0005_auto_20211007_1143'),
    ]

    operations = [
        migrations.AlterField(
            model_name='personalcheck',
            name='w_hours',
            field=computed_property.fields.ComputedCharField(compute_from='hours', editable=False, max_length=300),
        ),
    ]

# Generated by Django 3.2.8 on 2021-10-07 12:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CheckIn', '0007_personalcheck_period'),
    ]

    operations = [
        migrations.AddField(
            model_name='personalcheck',
            name='isWorking',
            field=models.BooleanField(default=0),
            preserve_default=False,
        ),
    ]
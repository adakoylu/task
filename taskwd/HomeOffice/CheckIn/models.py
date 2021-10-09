from django.db import models
from django.contrib.auth.models import User

import computed_property

# Create your models here.

class PersonalCheck (models.Model):
    day = models.DateField()
    start_time = models.TimeField()
    finish_time = models.TimeField(null=True)
    period = models.CharField(max_length=300)
    personal = models.ForeignKey(User, on_delete=models.CASCADE)
    isWorking= models.BooleanField()
    w_hours = computed_property.ComputedCharField(compute_from='hours',max_length=300)
    
    
    def hours(self):
        self.period = "{}-{} Uhr".format(self.start_time,self.finish_time)

        return self.period


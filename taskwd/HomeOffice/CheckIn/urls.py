from django.urls import path,include
from . import views

urlpattern = [
    path('api-auth/', include('rest_framework.urls')),
]


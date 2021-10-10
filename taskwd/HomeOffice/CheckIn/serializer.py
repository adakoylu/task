from django.contrib.auth.models import User, Group
from django.db.models import fields
from rest_framework import serializers
from .models import PersonalCheck
from django.contrib.auth import get_user_model
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
UserModel = get_user_model()

class UserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):

        user = UserModel.objects.create_user(
            password=validated_data['password'],
            username = validated_data['username'],
        )

        return user

    class Meta:
        model = User
        fields = ['url', 'username','password']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class PersonalCheckSerializer (serializers.ModelSerializer):
    class Meta:
        model=  PersonalCheck
        fields = ["id","personal", "start_time","finish_time","w_hours","day","isWorking"]
        read_only_fields = ["w_hours","id",]




class TokenSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['user'] = str(user)

        return token



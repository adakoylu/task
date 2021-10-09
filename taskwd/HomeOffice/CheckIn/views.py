import datetime
from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets,generics,status
from rest_framework import views
from rest_framework.views import APIView
from rest_framework import permissions
from .serializer import UserSerializer, GroupSerializer,PersonalCheckSerializer,TokenSerializer
from .models import PersonalCheck
from rest_framework.response import Response
from django.http import Http404
from rest_framework.decorators import api_view
import json

from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

class TokenObtainView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = TokenSerializer

class CurrentUser(APIView):
    permission_classes = [permissions.IsAuthenticated]
    

    def get(self, request, format=None):
        personalid=int(request.user.id)
        status = PersonalCheck.objects.filter(personal_id=personalid).last()
        print(status.finish_time)
        print(int(request.user.id))
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'userid': str(request.user.id),
            
            'status' : {
                'isWorking' : bool(status.isWorking),
                'lastStart' : str(status.start_time),
                'lastFinish' : (status.finish_time),
                'period': status.period
            }
        }
        return Response(content)



class UserViewSet(viewsets.ModelViewSet):
   
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        pk = self.kwargs.get('pk')

        if pk == "current":
            return self.request.user

        return super(UserViewSet, self).get_object()

    


class GroupViewSet(viewsets.ModelViewSet):
    
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class CheckInDetail (APIView):

    queryset = PersonalCheck.objects.all()
    serializer_class = PersonalCheckSerializer

    def get_object(self, pk):
        try:
            return PersonalCheck.objects.get(pk=pk)
        except PersonalCheck.DoesNotExist:
            raise Http404
    
    def put(self, request,pk, format=None):
        personalEntry = self.get_object(pk) 
        serializer = PersonalCheckSerializer(personalEntry, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_404_NOT_FOUND)
    
    def get(self,request, pk, format=None):
        PersonalCheck = self.get_object(pk)
        serializer = PersonalCheckSerializer(PersonalCheck)
        return Response(serializer.data)

class CheckinViewSet(viewsets.ModelViewSet):
    queryset = PersonalCheck.objects.all()
    serializer_class = PersonalCheckSerializer

    def post(self,format=None):
        serializer = PersonalCheckSerializer
        return Response(serializer.data)




   


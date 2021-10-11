from django.shortcuts import render

from django.contrib.auth.models import User, Group
from rest_framework import viewsets,status
from rest_framework import views
from rest_framework.views import APIView
from rest_framework import permissions
from .serializer import UserSerializer, GroupSerializer,PersonalCheckSerializer,TokenSerializer
from .models import PersonalCheck
from rest_framework.response import Response
from django.http import Http404
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

class TokenObtainView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = TokenSerializer

class CurrentUser(APIView):
    permission_classes = [permissions.IsAuthenticated]
    

    def get(self, request, format=None):
        personalid=int(request.user.id)
        status = PersonalCheck.objects.filter(personal_id=personalid).last()

        if status:
            content = {
                'user': str(request.user),  
                'userid': str(request.user.id),
                
                'status' : {
                    'isWorking' : bool(status.isWorking),
                    'lastStart' : str(status.start_time),
                    'lastFinish' : (status.finish_time),
                    'period': status.period
                }              
        }
        else:
            content ={
                'user': str(request.user), 
                'userid': str(request.user.id),

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
    permission_classes = [permissions.IsAuthenticated,]

    def get_object(self, pk):
        try:
            return PersonalCheck.objects.filter(personal_id=pk).last()
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


class CheckInDateFilter(viewsets.ModelViewSet):
    queryset = PersonalCheck.objects.all()
    serializer_class = PersonalCheckSerializer
    permission_classes = [permissions.IsAuthenticated,]

    def get_queryset(self):
        user = self.request.user
        # print(user)
        return PersonalCheck.objects.filter(personal_id = user)


    def retrieve(self,request, format=None, *args, **kwargs):
        params = kwargs
        print(params['pk'])
        checkins = PersonalCheck.objects.filter(day = params['pk']).filter(personal_id =request.user)
        serializer = PersonalCheckSerializer(checkins, many=True)
       
        return Response(serializer.data)





   


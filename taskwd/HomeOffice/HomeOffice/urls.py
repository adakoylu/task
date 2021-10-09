"""HomeOffice URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path ,include
from rest_framework import routers
from CheckIn import views
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'checkin', views.CheckinViewSet)


# router.register(r'Finish', views.FinishDateUpdateViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-root/', include(router.urls)),
    path('CheckIn/<int:pk>/', views.CheckInDetail.as_view()),
    path('api-auth/', include('rest_framework.urls',  namespace='rest_framework')),
    # path('api/checkIn',  views.CheckInViewSet.as_view(), name="checin")
    path('login/', views.TokenObtainView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', views.CurrentUser.as_view(), name='me'),



]
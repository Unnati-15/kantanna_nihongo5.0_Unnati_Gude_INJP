"""backend URL Configuration

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

# backend/urls.py
from django.contrib import admin
from django.urls import path,include
from backend import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
# from flashcard.views import FlashCardList, FlashCardDetail
from .views import logout_view
from users.views import UserRegistrationView, UserLoginView, UserLogoutView
from learner.views import LearnerRegistrationView
# router = DefaultRouter()
# router.register(r'flashcard', FlashCardViewSet, basename='flashcard')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('translate/',views.translate),
    # path('register/',views.register_user),
    # path('login/',views.login_view),
    path('transcribe/',views.transcribe_audio),
    # path('flashcard/', FlashCardList.as_view(), name='flashcard-list'),  # GET and POST
    # path('flashcard/<int:pk>/', FlashCardDetail.as_view(), name='flashcard-detail'),  # GET, PUT, DELETE
    # path('logout/',logout_view),
    # path('registerusers/',RegisterView),
    # path('loginusers/',LoginView),
     path('translate-pdf/', views.translate_pdf),
     path('generate_audio/', views.generate_audio),
    # path('', include(router.urls)),
    #path('text-to-speech/', views.textspeech),
    


    path('api/auth/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('api/auth/login/', UserLoginView.as_view(), name='user-login'),
    path('api/auth/logout/', UserLogoutView.as_view(), name='user-logout'),
    path('api/auth/register/student/', LearnerRegistrationView.as_view(), name='student-registration'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

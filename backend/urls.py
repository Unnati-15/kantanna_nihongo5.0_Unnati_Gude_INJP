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
from flashcard.views import FlashCardList, FlashCardDetail
# router = DefaultRouter()
# router.register(r'flashcard', FlashCardViewSet, basename='flashcard')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('translate/',views.translate_text),
    path('register/',views.register_user),
    path('login/',views.login_view),
    path('transcribe/',views.transcribe_audio),
    path('flashcard/', FlashCardList.as_view(), name='flashcard-list'),  # GET and POST
    path('flashcard/<int:pk>/', FlashCardDetail.as_view(), name='flashcard-detail'),  # GET, PUT, DELETE
    path('logout/',views.logout_view),
    path('/check_user',views.check_user),
    # path('', include(router.urls)),
    #path('text-to-speech/', views.textspeech),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

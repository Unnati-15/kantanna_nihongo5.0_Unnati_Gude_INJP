from translate import Translator
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserRegistrationSerializer
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth import login 
import speech_recognition as sr
from django.contrib.auth import logout
import os


@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def translate_text(request):
    if request.method == 'POST':
        text = request.data.get('text')
        to_lang = request.data.get('to_language')
        from_lang = request.data.get('from_language')

        translator = Translator(to_lang=to_lang, from_lang=from_lang)
        translation = translator.translate(text)

        return Response({"translation": translation})

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({"message": "Logged in successfully", "user": {"username": user.username}})
    else:
        return Response({"message": "Invalid credentials"}, status=400)
    


@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({"message": "Logged out successfully"})

@api_view(['POST'])
def check_user(request):
    if request.user.is_authenticated:
        return Response({"user": {"username": request.user.username}})
    return Response({"user": None})

@api_view(['POST'])
def transcribe_audio(request):
    """ Handle audio file for transcription """
    r = sr.Recognizer()
    text = ""

    if 'myfilest' not in request.FILES:
        return Response({"error": "No audio file provided"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        myfilest = request.FILES['myfilest']
        audio_file = sr.AudioFile(myfilest)
        with audio_file as source:
            audio_data = r.record(source)

        try:
            text = r.recognize_google(audio_data, language="ja-JP")
            return Response({"transcription": text}, status=status.HTTP_200_OK)
        except sr.UnknownValueError:
            return Response({"error": "Google Speech Recognition could not understand the audio"}, status=status.HTTP_400_BAD_REQUEST)
        except sr.RequestError as e:
            return Response({"error": f"Could not request results from Google Speech Recognition service; {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
from translate import Translator
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserRegistrationSerializer
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
import speech_recognition as sr
import json
import traceback
import os
from django.conf import settings
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from tempfile import NamedTemporaryFile
import pyttsx3
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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
    
    user = authenticate(username=username, password=password)
    
    if user is not None:
        auth_login(request, user)
        return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
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
    
# @api_view(['POST'])
# def convert_text_to_speech(request):
#     """ Handle text for conversion to speech using gTTS """
#     if 'myfile' not in request.data:
#         return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)

#     text = request.data['myfile']  # Correct way to extract 'myfile' from the request
    
#     try:
#         # Use gTTS for text-to-speech conversion
#         tts = gTTS(text=text, lang='ja')  # Set language to Japanese (or any other language you prefer)

#         # Define the path for saving the speech file
#         speech_file_path = os.path.join(settings.MEDIA_ROOT, 'speech.mp3')

#         # Save the speech file
#         tts.save(speech_file_path)

#         # Return the relative path to the saved speech file
#         return Response({"message": "Audio file is ready!", "file_path": f'{settings.MEDIA_URL}speech.mp3'}, status=status.HTTP_200_OK)
    
#     except Exception as e:
#         return Response({"error": f"An error occurred while converting text to speech: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# def text_to_speech(request):
#     # Get text from the request (assumes JSON payload)
#     text = request.POST.get("text")
#     if not text:
#         return JsonResponse({"error": "No text provided"}, status=400)

#     # Generate speech using gTTS
#     tts = gTTS(text, lang='ja')

#     # Save the speech to a temporary file
#     temp_file = NamedTemporaryFile(delete=False, suffix='.mp3')
#     tts.save(temp_file.name)

#     # Read the content of the generated file
#     with open(temp_file.name, 'rb') as f:
#         audio_content = f.read()

#     # Return the audio content as a base64-encoded string (optional)
#     audio_base64 = audio_content.encode('base64')  # For API consumption or streaming

#     # Clean up temporary file
#     os.remove(temp_file.name)

#     # Send the response with the audio content
#     return JsonResponse({
#         "audioContent": audio_base64
#     })
# Ensure the directory for saving audio files exists
MEDIA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'media')

if not os.path.exists(MEDIA_DIR):
    os.makedirs(MEDIA_DIR)

@csrf_exempt  # Disable CSRF validation for simplicity (not recommended for production)
def textspeech(request):
    if request.method == 'POST':
        try:
            # Extract text from POST request (sent as JSON)
            body = json.loads(request.body)
            formts = body.get('text', '')

            if not formts:
                return JsonResponse({'error': 'Text is required to generate speech.'}, status=400)

            # Initialize pyttsx3 engine
            engine = pyttsx3.init()

            # Set voice to Japanese (Haruka)
            jp_voiceid = "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Speech\\Voices\\Tokens\\TTS_MS_JA-JP_HARUKA_11.0"
            engine.setProperty('voice', jp_voiceid)

            # Save the speech audio file
            audio_filename = "speech.mp3"
            audio_file_path = os.path.join(MEDIA_DIR, audio_filename)
            engine.save_to_file(formts, audio_file_path)
            engine.runAndWait()

            # Return the audio file URL as response
            audio_file_url = f"/media/{audio_filename}"

            return JsonResponse({
                'status': 'success',
                'message': 'Audio file is ready!',
                'audio_file_url': audio_file_url  # URL to the audio file
            })

        except Exception as e:
            # Log the error details and stack trace
            print(f"Error processing request: {str(e)}")
            print(traceback.format_exc())
            return JsonResponse({'error': 'Internal Server Error', 'message': str(e)}, status=500)

    return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)
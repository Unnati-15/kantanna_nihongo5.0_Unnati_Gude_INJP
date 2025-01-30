

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import Group, User
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login

class RegisterView(APIView):
    def post(self, request):
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email=request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')
        role = request.data.get('role')  # Role (Learner, Interpreter, or Company)

        if not username or not password or not role:
            return Response({"detail": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(first_name=first_name,last_name=last_name,email=email,username=username, password=password)
        group = Group.objects.get(name=role)
        user.groups.add(group)
        user.save()

        return Response({"detail": "User created successfully"}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

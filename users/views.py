

# # Create your views here.
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from django.contrib.auth.models import Group, User
# from rest_framework import status
# from rest_framework_simplejwt.tokens import RefreshToken
# from django.contrib.auth import authenticate, login

# class RegisterView(APIView):
#     def post(self, request):
#         first_name = request.data.get('first_name')
#         last_name = request.data.get('last_name')
#         email=request.data.get('email')
#         username = request.data.get('username')
#         password = request.data.get('password')
#         role = request.data.get('role')  # Role (Learner, Interpreter, or Company)

#         if not username or not password or not role:
#             return Response({"detail": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)

#         user = User.objects.create_user(first_name=first_name,last_name=last_name,email=email,username=username, password=password)
#         group = Group.objects.get(name=role)
#         user.groups.add(group)
#         user.save()

#         return Response({"detail": "User created successfully"}, status=status.HTTP_201_CREATED)

# class LoginView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             })
#         return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)53d3b677500b50ee533ee87c52b7e3bb01f52fc3



from users.models import User
from users.serializers import UserSerializer
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserLoginView(ObtainAuthToken):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            if created:
                token.delete()  # Delete the token if it was already created
                token = Token.objects.create(user=user)
            return Response({'token': token.key, 'username': user.username, 'role': user.role})
        else:
            return Response({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
        
class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # The request.auth will hold the Token object if the request is authenticated
        token = request.auth  # This will get the token associated with the user

        if token:
            # Delete the token to log the user out
            token.delete()
            return Response({'detail': 'Successfully logged out.'})
        else:
            return Response({'detail': 'No token provided or token is invalid.'}, status=400)
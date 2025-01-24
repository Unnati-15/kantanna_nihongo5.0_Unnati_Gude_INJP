from rest_framework import viewsets
from .models import FlashCard
from .serializers import FlashCardSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FlashCard
from .serializers import FlashCardSerializer
from rest_framework import permissions
# class FlashCardViewSet(viewsets.ModelViewSet):
#     queryset = FlashCard.objects.all()
#     serializer_class = FlashCardSerializer 
class FlashCardList(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        flashcards = FlashCard.objects.all()
        serializer = FlashCardSerializer(flashcards, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FlashCardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # assuming FlashCard model has a user field
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FlashCardDetail(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, pk):
        try:
            flashcard = FlashCard.objects.get(pk=pk)
        except FlashCard.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = FlashCardSerializer(flashcard)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            flashcard = FlashCard.objects.get(pk=pk)
        except FlashCard.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = FlashCardSerializer(flashcard, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            flashcard = FlashCard.objects.get(pk=pk)
        except FlashCard.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        flashcard.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
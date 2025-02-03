from rest_framework import serializers
from .models import User,Learner
from users.serializers import UserSerializer

class LearnerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Learner
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        learner = Learner.objects.create(user=user, **validated_data)
        return learner
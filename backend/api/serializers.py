from rest_framework import serializers
from .models import Project,Team

# Serializer for the Project model
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

# Serializer for the Team model
class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields= '__all__'
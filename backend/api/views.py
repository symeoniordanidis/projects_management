from .models import Project,Team
from rest_framework import viewsets
from .serializers import TeamSerializer,ProjectSerializer

#ViewSet for the Project model
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

#ViewSet for the Team model
class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
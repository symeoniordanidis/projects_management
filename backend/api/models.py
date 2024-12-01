from django.db import models

# Create your models here.
STATUSES = (
    ('new','New'),
    ('in_progress','In Progress'),
    ('completed','Completed'),
    ('cancelled','Cancelled')
)


class Project(models.Model):
    title = models.Charfield(max_length=100,blank=True)
    description = models.TextField(blank=True)
    start_date=models.DateField(blank=False)
    last_updated_date = models.DateField(auto_now=True)
    team = models.ForeignKey('Team',on_delete = models.SET_NULL,null=True,related_name='projects')
    status = models.CharField(max_length=25,
                              choices=STATUSES,
                              default='new',
                              blank=False)
    def __str__(self):
        return self.title


class Team(models.Model):
    name = models.CharField(max_length=100,blank=False)

    def __str__(self):
        return self.name
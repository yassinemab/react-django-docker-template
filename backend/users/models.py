from base.models import BaseModel
from django.db import models


class User(BaseModel):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    # role = models.ForeignKey(Roles, on_delete=models.CASCADE)

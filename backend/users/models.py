from base.models import BaseModel
from django.db import models


class Users(BaseModel):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    class Meta:
        db_table = "Users"

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name

    # Standard function for serializing the user object
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

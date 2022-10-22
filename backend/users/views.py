from rest_framework import viewsets, status
from rest_framework.response import Response


class AuthViewSet(viewsets.ViewSet):
    def login(self, request):
        return Response({"success": True, "message": "Login was successful"},
                        status=status.HTTP_200_OK)

from .views import AuthViewSet, UsersViewSet
from django.urls import path

urlpatterns = [
    path('login/', AuthViewSet.as_view({'post': 'login'})),
    path('register/', AuthViewSet.as_view({'post': 'register'})),
    path('logout/', AuthViewSet.as_view({'post': 'logout'})),
    path('user/', UsersViewSet.as_view({'get': 'get'})),
]

from .views import AuthViewSet, UsersViewSet
from django.urls import path

urlpatterns = [
    path('login/', AuthViewSet.as_view({'post': 'login'}), name='login'),
    path('register/', AuthViewSet.as_view({'post': 'register'}), name='register'),
    path('logout/', AuthViewSet.as_view({'post': 'logout'}), name='logout'),
    path('user/', UsersViewSet.as_view({'get': 'get'}), name='user'),
]

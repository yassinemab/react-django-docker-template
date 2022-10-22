from .views import AuthViewSet
from django.urls import path

urlpatterns = [
    path('login/', AuthViewSet.as_view({'post': 'login'}))
]

# institutions_crud = InstitutionsViewSet.as_view(
#     {'get': 'getAll', 'post': 'add'})
# institutions_detail = InstitutionsViewSet.as_view(
#     {'get': 'getById', 'put': 'update', 'delete': 'delete'})

# institutionurls = [
#     path('', institutions_crud, name="institutions"),
#     re_path(r'(?P<id>\d+)/$', institutions_detail, name="institutions/id")
# ]

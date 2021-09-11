from django.conf.urls import url, include
from django.urls import path
from rest_framework.routers import DefaultRouter
from mapping.views import OntologyView, RelationalDBView, MappingProcessViewSet

router = DefaultRouter()
router.register(r'mapping_process', MappingProcessViewSet, basename="mapping_process")

urlpatterns = [
    path('ontologies/',
        OntologyView.as_view(),
        name='ontologies'),
    path('relational_db/',
        RelationalDBView.as_view(),
        name='relational_db'),
    path('', include(router.urls))
]
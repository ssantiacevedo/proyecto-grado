from django.conf.urls import url
from django.urls import path
from mapping.views import OntologyView, RelationalDBView

urlpatterns = [
    path('ontologies/',
        OntologyView.as_view(),
        name='ontologies'),
    path('relational_db/',
        RelationalDBView.as_view(),
        name='relational_db'),
]


from django.conf.urls import url
from django.urls import path
from generator.views import GeneratorView, GenerateGraph

app_name = 'generator'

urlpatterns = [
    path('', GeneratorView.as_view(), name='validate'),
    path('generate_graph/', GenerateGraph.as_view(), name='generate_graph'),
]


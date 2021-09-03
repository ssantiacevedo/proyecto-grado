from django.conf.urls import url
from django.urls import path
from generator.views import GeneratorView

app_name = 'generator'

urlpatterns = [
    path('', GeneratorView.as_view(), name='validate'),
]


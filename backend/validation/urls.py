from django.conf.urls import url
from django.urls import path
from validation.views import ValidationView

app_name = 'validation'

urlpatterns = [
    path('', ValidationView.as_view(), name='validate'),
]


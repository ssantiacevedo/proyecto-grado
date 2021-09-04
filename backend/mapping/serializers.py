from rest_framework import serializers

from .models import MappingProcess

class MappingProcessSerializer(serializers.ModelSerializer):

    class Meta:
        model = MappingProcess
        fields = ['uuid']
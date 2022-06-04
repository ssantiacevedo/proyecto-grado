from rest_framework import serializers

from .models import MappingProcess, Ontology, RelationalDB


class RelationalDBSerializer(serializers.ModelSerializer):

    class Meta:
        
        model = RelationalDB
        fields = '__all__'

class OntologySerializer(serializers.ModelSerializer):

    class Meta:
        
        model = Ontology
        fields = '__all__'

class MappingProcessSerializer(serializers.ModelSerializer):

    class Meta:
        model = MappingProcess
        fields = ['uuid', 'name']

class MappingProcessSerializerDetailed(serializers.ModelSerializer):
    ontologies = OntologySerializer(
      many=True,
      read_only=True,
    )
    relational_db = RelationalDBSerializer()

    class Meta:
        model = MappingProcess
        fields = ['uuid', 'name', 'steps_amount', 'valid_mapping', 'ontologies', 'relational_db']

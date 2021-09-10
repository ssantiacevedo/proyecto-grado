from rest_framework.response import Response
from mapping.models import RelationalDB, Ontology, MappingProcess
from mapping.utils import get_database_info, get_ontology_info_from_uri
from rest_framework import views, status
from owlready2 import *
import json


class ValidationView(views.APIView):

    def post(self, request):  # noqa C901
        data = request.data
        uuid = data.get('uuid', None)
        mapping = data.get('mapping', None)
        if not uuid or not mapping:
            return Response(
                'Error not uuid or mapping',
                status=status.HTTP_400_BAD_REQUEST
            )
        
        map_proccess = MappingProcess.objects.get(uuid=uuid)
        relational_db = map_proccess.relational_db

        db_info = get_database_info(
            relational_db.relational_db_name, 
            relational_db.relational_db_user, 
            relational_db.relational_db_port, 
            relational_db.relational_db_password)

        ontologies_info = []
        for onto in map_proccess.ontologies.all():
            if onto.ontology_type == 'FILE':
                data = get_ontology_info_from_uri(onto.ontology_file.name, True)
            else:
                data = get_ontology_info_from_uri(onto.ontology_uri, False)
            ontologies_info.append(data)
        
        ontos_classes = []
        for onto in ontologies_info:
            for onto_class in onto[0]['classes']:
                ontos_classes.append(onto_class['iri'])
        
        ontos_object_properties = {}
        for onto in ontologies_info:
            for onto_object_property in onto[1]['object_properties']:
                ontos_object_properties[onto_object_property['iri']] = onto_object_property
        
        ontos_data_properties = []
        for onto in ontologies_info:
            for onto_data_property in onto[2]['data_properties']:
                ontos_data_properties.append(onto_data_property['iri'])
        
        tables = [elem['table'] for elem in db_info]

        foreign_keys = []
        no_foreign_keys = []
        
        for db_elem in db_info:
            for column in db_elem['columns']:
                if column['foreign_key']:
                    foreign_keys.append(column['name'])
                else:
                    no_foreign_keys.append(column['name'])

        associative_tables = [
            elem['table'] for elem in db_info if len(elem['columns']) == 2 and 
            elem['columns'][0]['primary_key'] and 
            elem['columns'][1]['primary_key'] and 
            elem['columns'][0]['foreign_key'] and 
            elem['columns'][1]['foreign_key']
        ]

        errors = []
        for elem in mapping:
            db_elem = list(elem.keys())[0]
            onto_elems = elem[db_elem]
            onto_mapping_elems = [
                onto_elem['iri'] for map_elem in mapping for onto_elem in list(map_elem.values())[0]
            ]
            # Rules List
            if db_elem in tables:
                # Rule 2: handling of associative tables 
                if db_elem in associative_tables:
                    for onto_elem in onto_elems:
                        if onto_elem['iri'] not in ontos_object_properties.keys():
                            errors.append('{} is not an OWL Object Property'.format(onto_elem['name']))
                        else:
                            is_mapped_domain_assoc = False
                            is_mapped_range_assoc = False     

                            for domain_elem in ontos_object_properties[onto_elem['iri']]['domain']:
                                if domain_elem in onto_mapping_elems:
                                    is_mapped_domain_assoc = True
                                    continue
                            for range_elem in ontos_object_properties[onto_elem['iri']]['range']:
                                if range_elem in onto_mapping_elems:
                                    is_mapped_range_assoc = True
                                    continue
                            if not is_mapped_domain_assoc or not is_mapped_range_assoc:
                                errors.append('You must also map the domain and range of the Object Property: {}'.format(onto_elem['name']))
                else:
                    # Rule 1: mapping of tables to OWL Classes
                    for onto_elem in onto_elems:
                        if onto_elem['iri'] not in ontos_classes:
                            errors.append('{} is not an OWL Class'.format(onto_elem['name']))

            else:
                # Rule 6: mapping of foreign keys to OWL Object Properties
                # Where at least one element of the domain and one 
                # of the range must also be mapped.
                if db_elem in foreign_keys:
                    for onto_elem in onto_elems:
                        if onto_elem['iri'] not in ontos_object_properties.keys():
                            errors.append('{} is not an OWL Object Property'.format(onto_elem['name']))
                            continue

                        is_mapped_domain = False
                        is_mapped_range = False

                        for domain_elem in ontos_object_properties[onto_elem['iri']]['domain']:
                            if domain_elem in onto_mapping_elems:
                                is_mapped_domain = True
                                continue
                        for range_elem in ontos_object_properties[onto_elem['iri']]['range']:
                            if range_elem in onto_mapping_elems:
                                is_mapped_range = True
                                continue
                        if not is_mapped_domain or not is_mapped_range:
                            errors.append('You must also map the domain and range of the Object Property: {}'.format(onto_elem['name']))

                else:
                # Rule 3: mapping of columns (not foreign keys) to OWL Data Properties
                # Rule 4: mapping of columns (not foreign keys) to OWL Clases
                # TODO Rule 5: mapping of columns (not foreign keys) to Ontologies 
                    for onto_elem in onto_elems:
                        if onto_elem['iri'] not in ontos_data_properties + ontos_classes:
                            errors.append('Onto Element {} is not a Correct Element'.format(onto_elem['name']))

        if len(errors) > 0:
            return Response(
                {'errors': errors},
                status=status.HTTP_400_BAD_REQUEST
            )
        map_proccess.valid_mapping = mapping
        map_proccess.save()

        return Response({"OK": "Correct mapping"}, status=status.HTTP_200_OK)

from rest_framework import views, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import views
from owlready2 import *
from .utils import get_database_info, get_ontology_info_from_uri
import time
from .models import RelationalDB, Ontology, MappingProcess


class OntologyView(views.APIView):

    def post(self, request):  # noqa C901
        data = request.data
        
        # onto_info = Ontology.objects.create(ontology_type='FILE', ontology_file=request.FILES['onto'])
        # res = get_ontology_info_from_uri(onto_info.ontology_file.name, True)
        # print(res)
        
        if 'owls' in data:
            res = []
            ontology_objects = []
            owls = data['owls']
            for owl in owls:
                try:
                    if owl['type'] == 'file':
                        onto_info = Ontology.objects.create(ontology_type='FILE', ontology_file=owl['file'])
                        res += get_ontology_info_from_uri(onto_info.ontology_file.name, True)
                    else:
                        onto_info = Ontology.objects.create(ontology_type='URI', ontology_uri=owl['uri'])
                        res += get_ontology_info_from_uri(owl['uri'], False)
                    ontology_objects.append(onto_info)
                except Exception as e:
                    return Response(e.__str__(), status=400)
            
            try:
                mapping_process, _ = MappingProcess.objects.get_or_create(uuid=data['uuid'])
                for ontology in ontology_objects:
                    mapping_process.ontologies = ontology
                mapping_process.state = 'ONTOS_ENT'
                mapping_process.save()
                return Response(res, status=status.HTTP_200_OK)
            except Exception as e:
                return Response(e.__str__(), status=400)

        return Response(res, status=status.HTTP_200_OK)

class RelationalDBView(views.APIView):

    def post(self, request):  # noqa C901
        data = request.data
        print(data)
        try:
            uuid = data['uuid']
            db_user = data['user']
            db_name = data['name']
            db_port = data.get('port', None)
            db_password = data['password']
        except KeyError as e:
            return Response(
                data={'error': 'Fields are missing'},
                status=status.HTTP_400_BAD_REQUEST
            )

        connection = RelationalDB.objects.filter(relational_db_name=db_name)

        if connection.exists():
            connection[0].relational_db_user = db_user
            connection[0].relational_db_password = db_password
            if db_port:
                connection[0].relational_db_port = db_port
            connection[0].save()
            db = connection[0]
        else:
            db_data = {
                'relational_db_name': db_name, 
                'relational_db_user': db_user, 
                'relational_db_password': db_password
            }
            if db_port:
                db_data['relational_db_port'] = db_port
            
            db = RelationalDB.objects.create(**db_data)

        try:
            res = get_database_info(db_name, db_user, db_port, db_password)
            mapping_process, _ = MappingProcess.objects.get_or_create(
                uuid=uuid,
            )
            mapping_process.relational_db=db
            mapping_process.state='DB_ENT'
            mapping_process.save()
            return Response(res, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.__str__(), status=400)

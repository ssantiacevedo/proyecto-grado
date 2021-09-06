from rest_framework import views, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import views
from rest_framework import mixins
from rest_framework import viewsets
from owlready2 import *
from .utils import get_database_info, get_ontology_info_from_uri
import time
from .serializers import MappingProcessSerializer
from .models import RelationalDB, Ontology, MappingProcess


class OntologyView(views.APIView):

    def post(self, request):  # noqa C901
        data = request.data
        res = []
        ontology_objects = []
        uuid = ''
        identifier = 1
        if len(request.FILES) > 0:
            files = request.FILES.getlist('onto')
            for ff in files:
                onto_info = Ontology.objects.create(ontology_type='FILE', ontology_file=ff)
                res.append({ "id": identifier, "data": get_ontology_info_from_uri(onto_info.ontology_file.name, True)})
                identifier += 1
                ontology_objects.append(onto_info)

            uuid = request.FILES.getlist('uuid')[0].name

        if 'uris' in data and len(data['uris']) > 0:
            owls = data['uris']
            uuid = request.data['uuid']
            for owl in owls:
                try:
                    if owl['type'] == 'uri':
                        onto_info = Ontology.objects.create(ontology_type='URI', ontology_uri=owl['uri'])
                        res.append({ "id": identifier, "data": get_ontology_info_from_uri(owl['uri'], False)})
                        identifier += 1
                    ontology_objects.append(onto_info)
                except Exception as e:
                    return Response(e.__str__(), status=400)

        if (len(res) > 0):
            try:
                mapping_process, _ = MappingProcess.objects.get_or_create(uuid=uuid)
                for ontology in ontology_objects:
                    mapping_process.ontology_set.add(ontology) 
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
            steps_amount = data['steps']
            mapping_name = data['mappingName']
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
            mapping_process.steps_amount = steps_amount
            mapping_process.name = mapping_name
            mapping_process.relational_db=db
            mapping_process.state='DB_ENT'
            mapping_process.save()
            return Response(res, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.__str__(), status=400)

class MappingProcessViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):

    queryset = MappingProcess.objects.all()
    serializer_class = MappingProcessSerializer

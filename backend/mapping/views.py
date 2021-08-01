from rest_framework import views, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import views
from owlready2 import *
from get_table_names_from_create_table import get_database_info
from process_ontology import get_ontology_info_from_uri
import time
from .models import RelationalDB, Ontology

class OntologyView(views.APIView):

    def post(self, request):  # noqa C901
        data = request.data
        if 'uris' in data:
            res = [] 
            uris = data['uris']
            for uri in uris:
                onto_info = Ontology(ontology_type='URI', ontology_uri=uri['uri'])
                res += get_ontology_info_from_uri(uri['uri'])
                try:
                    onto_info.save()
                except Exception as e:
                    return Response(e.__str__(), status=400)
            return Response(res, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_200_OK)

class RelationalDBView(views.APIView):

    def post(self, request):  # noqa C901
        data = request.data
        try:
            db_user = data['user']
            db_name = data['name']
            db_password = data['password']
        except KeyError as e:
            return Response(
                data={'error': 'Fields are missing'},
                status=status.HTTP_400_BAD_REQUEST
            )

        connection = RelationalDB.objects.filter(relational_db_name=db_name)
        if connection:
            connection.relational_db_user = db_user
            connection.relational_db_password = db_password
        else:
            connection = RelationalDB(relational_db_name=db_name, relational_db_user=db_user, relational_db_password=db_password)

        res = get_database_info(db_name, db_user, db_password)
        try:
            connection.save()
            return Response(res, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.__str__(), status=400)

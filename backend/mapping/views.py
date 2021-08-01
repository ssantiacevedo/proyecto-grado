from rest_framework import views, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import views
from owlready2 import *
from get_table_names_from_create_table import get_database_info
import time


class OntologyView(views.APIView):

    def post(self, request):  # noqa C901
        # TODO: save .owl file as an Ontology model.
        return Response({"message": "OK"})


class RelationalDBView(views.APIView):

    def post(self, request):  # noqa C901
        # TODO: save .sql file as a RelationalDB model.
        # TODO: change the following code
        data = request.data
        res = get_database_info(data['name'], data['user'], data['password'])
        # print(res, request.data, data['name'])
        return Response({"data": res})

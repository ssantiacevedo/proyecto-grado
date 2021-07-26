from rest_framework import views, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import views
from owlready2 import *

class OntologyView(views.APIView):

    def post(self, request):  # noqa C901
        # TODO: save .owl file as an Ontology model.
        return Response({"message": "OK"})


class RelationalDBView(views.APIView):

    def post(self, request):  # noqa C901
        # TODO: save .sql file as a RelationalDB model.
        return Response({"message": "OK"})

from rest_framework.response import Response
from django.http import HttpResponse, HttpResponseNotFound
from mapping.models import RelationalDB, Ontology, MappingProcess
from mapping.utils import get_database_info, get_ontology_info_from_uri
from .utils import generator
from rest_framework import views, status
from owlready2 import *
import json
from wsgiref.util import FileWrapper


class GeneratorView(views.APIView):

    def post(self, request):  # noqa C901
        data = request.data

        uuid = data.get('uuid', None)
        if not uuid:
            return Response(
                'Error not uuid or mapping',
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            map_proccess = MappingProcess.objects.get(uuid=uuid)
        except Exception as e:
            msg = f"No mapping process found with uuid: {uuid}."
            return Response(msg, status=400) 
        if not generator(map_proccess):
            msg = f"A problem has occurred in the generation of the ontology."
            return Response(msg, status=400)  
        with open(f"media/result-{map_proccess.uuid}-{map_proccess.steps_amount-1}.owl", 'r') as f:
           ontology_file = f.read()

        try:    
            response = HttpResponse(ontology_file, content_type='multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW')
            response['Content-Disposition'] = 'attachment; filename="ontology.owl"'
            return response
        except IOError:
            return Response(msg, status=400) 

        return Response({"OK": "Correct mapping"}, status=status.HTTP_200_OK)
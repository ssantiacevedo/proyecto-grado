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
            ontology_elements = get_ontology_info_from_uri(f"result-{map_proccess.uuid}-{map_proccess.steps_amount-1}.owl", True)
            graph = {}
            nodes = []
            edges = []
            for class_node in ontology_elements[0]['classes']:
                mapped = False
                for elem in map_proccess.valid_mapping:
                    onto_elems = list(elem.values())
                    for name in onto_elems:
                        if name[0]['name'] == class_node['name']:
                            mapped = True
                            break
                node = { "id": class_node['iri'], "label": class_node['name']}
                if mapped:
                    node['color'] = "#5dbb63"
                nodes.append(node)
            for edge in ontology_elements[1]['object_properties']:
                mapped = False
                for elem in map_proccess.valid_mapping:
                    onto_elems = list(elem.values())
                    for name in onto_elems:
                        if name[0]['name'] == edge['name']:
                            mapped = True
                            break
                new_edge = { "id": edge['iri'], "from": edge['domain'][0], "to": edge['range'][0], "label": edge['name']}
                if mapped:
                    new_edge['color'] = "#5dbb63"
                    new_edge['width'] = 2
                edges.append(new_edge)
            graph['edges'] = edges
            graph['nodes'] = nodes
            response = Response({"graph": graph, "file": ontology_file}, status=status.HTTP_200_OK)

            return response
        except IOError:
            return Response(msg, status=400) 

        return Response({"OK": "Correct mapping"}, status=status.HTTP_200_OK)
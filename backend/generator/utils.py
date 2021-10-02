import os
import psycopg2
from owlready2 import *
from rdflib import URIRef
from rdflib.namespace import OWL
import random


def generator(map_proccess):
    
    ontologies = map_proccess.ontologies.all()
    onto_path.append("backend/media/")
    load_ontologies = []
    for ontology in ontologies:   
        if ontology.ontology_type == 'FILE':
            onto = get_ontology("file://media/" + ontology.ontology_file.name).load()
        else:
            onto = get_ontology(ontology.ontology_uri).load()
        load_ontologies.append(onto)

    graph = default_world.as_rdflib_graph()

    onto_classes = []
    for onto in load_ontologies:
        onto_classes.extend(list(onto.classes()))
    classes = [i.iri for i in onto_classes]

    mapping = map_proccess.valid_mapping
    if mapping is None:
        return False

    list_mapped_elements = []

    for elem in mapping:
        db_elem = list(elem.keys())[0]
        onto_elems = elem[db_elem]
        equivalent_classes = []
        for onto_elem in onto_elems:
            if onto_elem['iri'] in classes:
                onto_name = onto_elem['iri']
                list_mapped_elements.append(f'<{onto_name}>')
                equivalent_classes.append(URIRef(onto_elem['iri']))
            with load_ontologies[0]:
                for i in range(len(equivalent_classes)):
                    if (i+1 < len(equivalent_classes)):
                        graph.add((equivalent_classes[i], OWL.sameAs, equivalent_classes[i+1]))
    try:
        for i in range(map_proccess.steps_amount):
            
            res_n = graph.query(
                "CONSTRUCT {  ?mapped_object ?a ?b . ?x ?y ?mapped_object ; ?c ?d . ?d a ?e } "  
                f"WHERE {{ VALUES ?mapped_object {{ {' '.join(list_mapped_elements)} }} ?mapped_object ?a ?b . ?x ?y ?mapped_object ; ?c ?d . OPTIONAL {{ ?d a ?e }} }} "   
            )
            
            res_n.serialize(format='pretty-xml', destination=f"media/result-{map_proccess.uuid}-{i}.owl")
            
            temp_onto = get_ontology(f"file://media/result-{map_proccess.uuid}-{i}.owl").load()
            onto_classes = list(temp_onto.classes())
            for onto_elem in onto_classes:
                elem_name = f"<{onto_elem.iri}>"
                if elem_name not in list_mapped_elements:
                    list_mapped_elements.append(f"<{onto_elem.iri}>")
            if (i < map_proccess.steps_amount-1) and (os.path.exists(f"media/result-{map_proccess.uuid}-{i}.owl")):
                os.remove(f"media/result-{map_proccess.uuid}-{i}.owl")
        return True 
    except:
        return False

def onto_graph_generator(ontology_elements, map_proccess):
    graph = {}
    nodes = []
    edges = []
    onto_mapping_elems = [
        onto_elem['iri'] for map_elem in map_proccess.valid_mapping for onto_elem in list(map_elem.values())[0]
    ]
    for class_node in ontology_elements[0]['classes']:
        node = { "id": class_node['iri'], "label": class_node['name']}
        if class_node['iri'] in onto_mapping_elems:
            node['color'] = "#5dbb63"
            # Check if the class is subClass of another class 
            if (len(class_node['is_a']) > 1 or (len(class_node['is_a']) == 1 and class_node['is_a'][0] != 'https://www.w3.org/2002/07/owl#Thing')):
                for parent_class in class_node['is_a']:
                    if parent_class != 'https://www.w3.org/2002/07/owl#Thing':
                        from_iri = class_node['iri']
                        to_iri = parent_class
                        new_edge = { 
                            "id": f'{from_iri}-rdfs:subClassOf-{to_iri}', 
                            "from": from_iri, 
                            "to": to_iri,
                            "label": 'rdfs:subClassOf',
                            "dashes": True,
                            "arrows": 'from'
                        }
                        edges.append(new_edge)
            # Check if the class has equivalent elements
            if (len(class_node['equivalent_to']) > 0):
                from_iri = class_node['iri']
                to_iri = class_node['equivalent_to'][0].iri
                new_edge = { 
                    "id": f'{from_iri}-owl:sameAs-{to_iri}', 
                    "from": from_iri, 
                    "to": to_iri, 
                    "label": 'owl:sameAs'
                }
                edges.append(new_edge)
        nodes.append(node)
    for edge in ontology_elements[1]['object_properties']:
        new_edge = { 
            "id": edge['iri'], 
            "from": edge['domain'][0] if len(edge['domain']) > 0 else None, 
            "to": edge['range'][0] if len(edge['range']) > 0 else None, 
            "label": edge['name']
        }
        if edge['iri'] in onto_mapping_elems:
            new_edge['color'] = "#5dbb63"
            new_edge['width'] = 2
        edges.append(new_edge)
    for edge in ontology_elements[2]['data_properties']:
        if (len(edge['range']) > 0):
            id_node = random.random()
            node = { "id": id_node, "label": edge['range'][0], 'color': '#FFFF00', 'font': {'color': 'black'}}
            nodes.append(node)
            new_edge = { 
                "id": edge['iri'], 
                "from": edge['domain'][0] if len(edge['domain']) > 0 else None, 
                "to": id_node if len(edge['range']) > 0 else None, 
                "label": edge['name']
            }
            if edge['iri'] in onto_mapping_elems:
                new_edge['color'] = "#5dbb63"
                new_edge['width'] = 2
            edges.append(new_edge)
    graph['edges'] = edges
    graph['nodes'] = nodes

    return graph
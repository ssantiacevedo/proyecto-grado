import os
import psycopg2
from owlready2 import *


def generator(map_proccess):

    ontologies = map_proccess.ontologies.all()

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
        for onto_elem in onto_elems:
            if onto_elem['iri'] in classes:
                onto_name = onto_elem['iri']
                list_mapped_elements.append(f'<{onto_name}>')

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

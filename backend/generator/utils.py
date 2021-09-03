import psycopg2
from owlready2 import *


def generator(map_proccess, mapping):

    ontology = map_proccess.ontology_set.last()
        
    if ontology.ontology_type == 'FILE':
        onto = get_ontology("file://media/" + ontology.ontology_file.name).load()
    else:
        onto = get_ontology(ontology.ontology_uri).load()

    graph = default_world.as_rdflib_graph()

    onto_classes = list(onto.classes())
    classes = [i.iri for i in onto_classes]

    list_mapped_elements = []
    for elem in mapping:
        db_elem = list(elem.keys())[0]
        onto_elems = elem[db_elem]
        for onto_elem in onto_elems:
            if onto_elem['iri'] in classes:
                onto_name = onto_elem['name']
                list_mapped_elements.append(f'onto:{onto_name}')

    try:
        for _ in range(map_proccess.steps_amount):
            res_n = graph.query(
                f"PREFIX onto:<{onto.base_iri}> "
                "CONSTRUCT {  ?mapped_object ?a ?b . ?x ?y ?mapped_object ; ?c ?d . ?d a ?e } "  
                f"WHERE {{ VALUES ?mapped_object {{ {' '.join(list_mapped_elements)} }} ?mapped_object ?a ?b . ?x ?y ?mapped_object ; ?c ?d . ?d a ?e}} "   
            )
            
            res_n.serialize(format='pretty-xml', destination=f"result-{map_proccess.uuid}.owl")
            
            temp_onto = get_ontology(f"file://result-{map_proccess.uuid}.owl").load()
            onto_classes = list(temp_onto.classes())
            for onto_elem in onto_classes:
                list_mapped_elements.append(f'onto:{onto_elem.name}')
        return True 
    except:
        return False
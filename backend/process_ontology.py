from owlready2 import *

#This gets a lot to process. We should change this to recieve a .owl file fron the frontend
# onto = get_ontology("http://www.lesfleursdunormal.fr/static/_downloads/pizza_onto.owl").load()


def get_ontology_info_from_uri(uri):
  onto = get_ontology(uri).load()

  ## These are generators 
  onto_classes = list(onto.classes())
  onto_object_properties = list(onto.object_properties())
  onto_data_properties = list(onto.data_properties())
  
  ## Transform generators to string names to be serializable
  classes = [i.name for i in onto_classes]
  obj_properties = [i.name for i in onto_object_properties]
  data_properties = [i.name for i in onto_data_properties]

  res = [{ "classes": classes}, { "object_properties": obj_properties}, { "data_properties": data_properties}]
  return res
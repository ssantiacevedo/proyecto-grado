from owlready2 import *

#This gets a lot to process. We should change this to recieve a .owl file fron the frontend
onto = get_ontology("http://www.lesfleursdunormal.fr/static/_downloads/pizza_onto.owl").load()

print('####Clases#####')
print(list(onto.classes()))
print('####Object Properties#####')
print(list(onto.object_properties()))
print('####Data Properties#####')
print(list(onto.data_properties()))

print([
  { 'classes': list(onto.classes())},
  { 'object_properties': list(onto.object_properties())},
  { 'data_properties': list(onto.data_properties())},
])
# def data_to_json(data, name):
#   res = []
#   for item in data:
#     res.append({ name: })
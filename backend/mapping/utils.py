import psycopg2
from owlready2 import *
import re

def get_database_info(db_name, user, port, password):
  db_data = {
    'host': 'host.docker.internal', 
    'dbname': db_name,
    'user': user, 
    'password': password, 
  }
  if port:
    db_data['port'] = port
  conn = psycopg2.connect(**db_data)
  cursor = conn.cursor()

  cursor.execute("""SELECT relname FROM pg_class WHERE relkind='r'
                  AND relname !~ '^(pg_|sql_)';""") # "rel" is short for relation.

  tables = [i[0] for i in cursor.fetchall()] # A list() of tables.

  result = []
  for item in tables:
    cursor.execute("""SELECT c.column_name, c.data_type,
      CASE WHEN EXISTS(SELECT 1 FROM INFORMATION_SCHEMA.constraint_column_usage k WHERE c.table_name = k.table_name and k.column_name = c.column_name) 
      THEN true ELSE false END as primary_key, 
      CASE WHEN EXISTS(SELECT 1 FROM INFORMATION_SCHEMA.key_column_usage k WHERE c.table_name = k.table_name and k.column_name = c.column_name) AND 
      EXISTS(SELECT 1 FROM INFORMATION_SCHEMA.referential_constraints f INNER JOIN INFORMATION_SCHEMA.key_column_usage k ON k.constraint_name = f.constraint_name WHERE k.column_name = c.column_name) 
      THEN true ELSE false END as foreign_key 
      FROM INFORMATION_SCHEMA.COLUMNS c 
      WHERE c.table_name='%s';""" % item
    )
    columns_list = cursor.fetchall()
    columns_processed = []
    for col in columns_list:
      columns_processed.append({ "name": col[0], "type": col[1], "primary_key": col[2], "foreign_key": col[3] })

    result.append({ "table": item, "columns": columns_processed})
  
  return result

def data_prop_range_to_str(name):
  class_name = re.search("'(.+?)'", name)
  if class_name:
    return class_name.group(1)
  return None

def get_ontology_info_from_uri(uri, is_file, incomplete = True):
    onto_path.append("backend/media/")
    if is_file:
        if incomplete:
          onto = get_ontology("file://media/ontologies/" + uri).load()
        else:
          onto = get_ontology("file://media/" + uri).load()
    else:
      onto = get_ontology(str(uri).strip()).load()

    ## These are generators 
    onto_classes = list(onto.classes())
    onto_object_properties = list(onto.object_properties())
    onto_data_properties = list(onto.data_properties())
    
    ## Transform generators to string names to be serializable
    classes = [
      {
        'name':i.label[0] if len(i.label) > 0 else i.name, 
        'iri': i.iri,
        'equivalent_to': i.equivalent_to,
        'is_a': [elem.iri for elem in i.is_a if (elem is not None and getattr(elem, 'name', None) and elem.name != 'Thing')],
      } for i in onto_classes if getattr(i, 'iri', None)
    ]
    obj_properties = [
      {
          'name':i.label[0] if len(i.label) > 0 else i.name,
          'iri': i.iri,
          'domain': [elem.iri for elem in i.domain if elem is not None and getattr(elem, 'iri', None)],
          'range': [elem.iri for elem in i.range if elem is not None and getattr(elem, 'iri', None)],
      } for i in onto_object_properties if getattr(i, 'iri', None)]
    data_properties = [
      {
        'name':i.label[0] if len(i.label) > 0 else i.name,
        'domain': [elem.iri for elem in i.domain if elem is not None and getattr(elem, 'iri', None)],
        'range': [data_prop_range_to_str(str(elem)) for elem in i.range if elem is not None],
        'iri': i.iri
      } for i in onto_data_properties if getattr(i, 'iri', None)]

    res = [
        { "classes": classes}, 
        { "object_properties": obj_properties}, 
        { "data_properties": data_properties}
    ]
    close_world(onto)
    return res
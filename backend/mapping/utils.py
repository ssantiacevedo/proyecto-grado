import psycopg2
from owlready2 import *


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


def get_ontology_info_from_uri(uri, is_file):
    #This gets a lot to process. We should change this to recieve a .owl file fron the frontend
    # onto = get_ontology("http://www.lesfleursdunormal.fr/static/_downloads/pizza_onto.owl").load()

    if is_file:
        onto = get_ontology("file://media/" + uri).load()
    else:
        onto = get_ontology(uri).load()

    ## These are generators 
    onto_classes = list(onto.classes())
    onto_object_properties = list(onto.object_properties())
    onto_data_properties = list(onto.data_properties())
    
    ## Transform generators to string names to be serializable
    classes = [{'name':i.name, 'iri': i.iri} for i in onto_classes]
    obj_properties = [{'name':i.name, 'iri': i.iri} for i in onto_object_properties]
    data_properties = [{'name':i.name, 'iri': i.iri} for i in onto_data_properties]

    res = [
        { "classes": classes}, 
        { "object_properties": obj_properties}, 
        { "data_properties": data_properties}
    ]
    return res
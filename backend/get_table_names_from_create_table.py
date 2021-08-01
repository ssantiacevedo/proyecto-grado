import sqlparse
import re
from sql_metadata import Parser

# def remove_sql_comments(query):
#   return re.sub(r"(.*\s+\-\-.*)", "", query)

# def get_create_table_sentences(query):
#   return [x for x in query if 'CREATE TABLE' in x]

# def parse_table_name(tokens):
#     for token in reversed(tokens):
#         if token.ttype is None:
#             return token.value
#     return " "

# def get_tables_names(line):
#   parse = sqlparse.parse(line)
#   result = []
#   for stmt in parse:
#       # Get all the tokens except whitespaces
#       tokens = [t for t in sqlparse.sql.TokenList(stmt.tokens) if t.ttype != sqlparse.tokens.Whitespace]
#       is_create_stmt = False
#       for i, token in enumerate(tokens):
#           # Is it a create statements ?
#           if token.match(sqlparse.tokens.DDL, 'CREATE'):
#               is_create_stmt = True
#               continue
          
#           # If it was a create statement and the current token starts with "("
#           if is_create_stmt and token.value.startswith("("):
#               # Get the table name by looking at the tokens in reverse order till you find
#               # a token with None type
#               result += [parse_table_name(tokens[:i])]
#   return result

# def get_columns_names(line):
#   result = []
#   step1 = remove_sql_comments(line)
#   step2 = step1.split(';')
#   step3 = get_create_table_sentences(step2)
#   for query in step3:
#     result += [Parser(query).columns]
#   return result

# def get_tables_and_columns(line):
#   column_names = get_columns_names(line)
#   table_names = get_tables_names(line)

#   result = []
#   # To avoid overflow if arrays doesn't match
#   which_iterate = column_names
#   if(len(table_names) < len(column_names)):
#     which_iterate = table_names
#   for index, query in enumerate(which_iterate):
#     obj = { 'table': table_names[index], 'columns': query }
#     result += [obj]
#   return result



## This should be the definite one

import psycopg2

def get_database_info(db_name, user, password):
  conn = psycopg2.connect(host='host.docker.internal', dbname=db_name,
                        user=user, password=password)
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

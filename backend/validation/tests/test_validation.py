from django.test import TestCase
from django.urls import reverse
from unittest.mock import patch
import json

from rest_framework.test import APIClient
from rest_framework import status

from mapping.models import Ontology, RelationalDB, MappingProcess


VALIDATION_URL = reverse('validation:validate')

def mocked_db_connection(db_name, db_user, db_port, db_password):
    return [{'table': 'AssociativeTable', 
            'columns': 
                [{'name': 'AssociativeTable_Column1', 'type': 'integer', 'primary_key': True, 'foreign_key': True}, 
                {'name': 'AssociativeTable_Column2', 'type': 'integer', 'primary_key': True, 'foreign_key': True}]}, 
            {'table': 'MappedTable2', 
            'columns': 
                [{'name': 'MappedTable2_Column1', 'type': 'integer', 'primary_key': True, 'foreign_key': True}, 
                {'name': 'MappedTable2_Column2', 'type': '"char"', 'primary_key': False, 'foreign_key': False}, 
                {'name': 'MappedTable2_Column3', 'type': 'ARRAY', 'primary_key': False, 'foreign_key': False}]}, 
            {'table': 'MappedTable1', 
            'columns': 
                [{'name': 'MappedTable1_Column1', 'type': 'integer', 'primary_key': True, 'foreign_key': True}, 
                {'name': 'MappedTable1_Column2', 'type': '"char"', 'primary_key': False, 'foreign_key': False}]}
            ]
 

class ValidationTests(TestCase):
    """
    Tests for validation endpoint
    """

    def setUp(self):
        self.client = APIClient()
        self.uuid = '4f607316-dd5b-4c4e-a83f-6a2dc94de89a'
        
        self.ontology = Ontology.objects.create(
            ontology_type='URI', 
            ontology_uri="http://www.lesfleursdunormal.fr/static/_downloads/pizza_onto.owl")
        db_data = {
            'relational_db_name': 'db_name', 
            'relational_db_user': 'db_user', 
            'relational_db_password': 'db_password'
        }
        self.relational_db = RelationalDB.objects.create(**db_data)

        self.mapping_process = MappingProcess.objects.create(
            uuid=self.uuid,
            relational_db=self.relational_db,
        )
        self.mapping_process.ontology_set.add(self.ontology)
        self.iri = "http://www.lesfleursdunormal.fr/static/_downloads/pizza_onto.owl"
        self.success_mapping = {
            'MappedTable1': [f'{self.iri}#CheeseTopping'],
            'MappedTable2': [f'{self.iri}#FishTopping'],
            'AssociativeTable': [f'{self.iri}#has_topping'],
            'MappedTable2_Column1': [f'{self.iri}#has_topping'],
            'MappedTable2_Column2': [f'{self.iri}#TomatoTopping']
        }

    @patch("validation.views.get_database_info", mocked_db_connection)
    def test_successful_mapping(self):
        payload = {
            'uuid': self.uuid,
            'mapping': self.success_mapping
        }

        res = self.client.post(VALIDATION_URL, json.dumps(payload), content_type='application/json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
    
    @patch("validation.views.get_database_info", mocked_db_connection)
    def test_invalid_table_mapping(self):
        bad_mapping = {
            'MappedTable1': [f'{self.iri}#has_topping'],
        }
        payload = {
            'uuid': self.uuid,
            'mapping': bad_mapping,
        }

        res = self.client.post(VALIDATION_URL, json.dumps(payload), content_type='application/json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    @patch("validation.views.get_database_info", mocked_db_connection)
    def test_invalid_associative_table_mapping(self):
        bad_mapping = {
            'AssociativeTable': [f'{self.iri}#CheeseTopping'],
        }
        payload = {
            'uuid': self.uuid,
            'mapping': bad_mapping
        }

        res = self.client.post(VALIDATION_URL, json.dumps(payload), content_type='application/json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
    
    @patch("validation.views.get_database_info", mocked_db_connection)
    def test_invalid_foreign_keys_mapping(self):
        bad_mapping = {
            'MappedTable2_Column1': [f'{self.iri}#has_topping', f'{self.iri}#CheeseTopping'],
        }
        payload = {
            'uuid': self.uuid,
            'mapping': bad_mapping
        }

        res = self.client.post(VALIDATION_URL, json.dumps(payload), content_type='application/json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
    
    @patch("validation.views.get_database_info", mocked_db_connection)
    def test_invalid_no_foreign_keys_mapping(self):
        bad_mapping = {
            'MappedTable2_Column2': [f'{self.iri}#has_topping'],
        }
        payload = {
            'uuid': self.uuid,
            'mapping': bad_mapping
        }

        res = self.client.post(VALIDATION_URL, json.dumps(payload), content_type='application/json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
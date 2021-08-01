from django.db import models
import uuid

class Ontology(models.Model):

    URI = 'URI'
    FILE = 'FILE'
    ONTOLOGY_TYPES = ((URI, 'Ontology URI'), 
                        (FILE, 'Ontology File'))

    ontology_file = models.FileField(upload_to='ontologies/', blank=True, null=True)
    ontology_uri = models.TextField(blank=True, null=True)
    ontology_type = models.CharField(
        choices=ONTOLOGY_TYPES,
        default=URI,
        max_length=10,
        verbose_name='Type of the ontology uploaded')

class RelationalDB(models.Model):
    relational_db_name = models.CharField(max_length=120, blank=True, null=True)
    relational_db_user = models.CharField(max_length=120, blank=True, null=True)
    relational_db_password = models.CharField(max_length=120, blank=True, null=True)

class MappingProcess(models.Model):

    ONTOLOGIES_ENTERED = 'ONTOS_ENT'
    RELATIONAL_DB_ENTERED = 'DB_ENT'
    MAPPING_DONE = 'MAP_DONE'

    PROCESS_STATES = ((ONTOLOGIES_ENTERED, 'Ontologies entered'), 
                        (RELATIONAL_DB_ENTERED, 'Relational DB entered'),
                        (MAPPING_DONE, 'Mapping done'))

    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ontologies = models.ForeignKey(Ontology, on_delete=models.CASCADE)
    relational_db = models.OneToOneField(RelationalDB, on_delete=models.CASCADE)
    state = models.CharField(
        choices=PROCESS_STATES,
        default=ONTOLOGIES_ENTERED,
        verbose_name='State of the mapping proccess',
        max_length=10)

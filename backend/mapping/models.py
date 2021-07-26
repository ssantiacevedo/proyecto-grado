from django.db import models
import uuid

class Ontology(models.Model):
    ontology_field = models.FileField(upload_to='ontologies/')

class RelationalDB(models.Model):
    relational_db_field = models.FileField(upload_to='relational_dbs/')

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

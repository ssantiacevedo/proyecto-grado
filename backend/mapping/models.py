from django.db import models
from users.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
import uuid

class RelationalDB(models.Model):

    def __str__(self):
        return self.relational_db_name

    relational_db_name = models.CharField(max_length=120, blank=True, null=True)
    relational_db_user = models.CharField(max_length=120, blank=True, null=True)
    relational_db_password = models.CharField(max_length=120, blank=True, null=True)
    relational_db_port = models.IntegerField(null=True, blank=True)

class MappingProcess(models.Model):

    class Meta:
        ordering = ['name']

    def __str__(self):
        return str(self.name)

    ONTOLOGIES_ENTERED = 'ONTOS_ENT'
    RELATIONAL_DB_ENTERED = 'DB_ENT'
    MAPPING_DONE = 'MAP_DONE'

    PROCESS_STATES = ((ONTOLOGIES_ENTERED, 'Ontologies entered'), 
                        (RELATIONAL_DB_ENTERED, 'Relational DB entered'),
                        (MAPPING_DONE, 'Mapping done'))

    name = models.CharField(max_length=120, blank=True, null=True)
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    relational_db = models.ForeignKey(RelationalDB, on_delete=models.CASCADE, null=True)
    steps_amount = models.IntegerField(
        default=2,
        validators=[
            MaxValueValidator(10),
            MinValueValidator(1)
        ]
    )
    state = models.CharField(
        choices=PROCESS_STATES,
        default=ONTOLOGIES_ENTERED,
        verbose_name='State of the mapping proccess',
        max_length=10)
    valid_mapping = models.JSONField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

class Ontology(models.Model):
    class Meta:
        verbose_name_plural = "Ontologies"

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
    mapping_proccess = models.ForeignKey(MappingProcess, on_delete=models.CASCADE, null=True, related_name='ontologies')
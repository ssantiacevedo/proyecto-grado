from django.contrib import admin
from .models import RelationalDB, Ontology, MappingProcess

admin.site.register(RelationalDB)
admin.site.register(Ontology)
admin.site.register(MappingProcess)
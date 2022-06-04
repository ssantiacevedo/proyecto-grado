from django.contrib import admin
from .models import RelationalDB, Ontology, MappingProcess

class OntologyInline(admin.TabularInline):
    model = Ontology
    fields = ('ontology_type', 'ontology_file', 'ontology_uri',)
    readonly_fields = ('ontology_type', 'ontology_file', 'ontology_uri',)
    max_num = 0

class MappingProcessAdmin(admin.ModelAdmin):
    inlines = [
        OntologyInline,
    ]

admin.site.register(RelationalDB)
admin.site.register(Ontology)
admin.site.register(MappingProcess, MappingProcessAdmin)
export const dataDB = [
  {'table': 'public.universidad_asignatura', 'columns': ['id', 'nombre', 'instituto_id']},
  {'table': 'public.universidad_beca', 'columns': ['id', 'nombre']},
  {'table': 'public.universidad_carrera', 'columns': ['id', 'nombre']},
  {'table': 'public.universidad_curso', 'columns': ['id', 'nombre', 'cupo', 'anio_dictado', 'asignatura_id']},
  {'table': 'public.universidad_direccion', 'columns': ['id', 'calle', 'ciudad', 'departamento', 'codigo_postal', 'pais']},
  {'table': 'public.universidad_estudiante', 'columns': ['nombre', 'ci', 'email', 'address', 'numero_de_estudiante', 'promedio', 'beca_id', 'carrera_id', 'direccion_id']},
  {'table': 'public.universidad_estudiante_cursos', 'columns': ['id', 'estudiante_id', 'curso_id']},
  {'table': 'public.universidad_instituto', 'columns': ['id', 'nombre']},
  {'table': 'public.universidad_profesor', 'columns': ['id', 'nombre', 'ci', 'email', 'address', 'salario', 'direccion_id', 'instituto_id']},
  {'table': 'public.universidad_profesor_curso', 'columns': ['id', 'profesor_id', 'instituto_id']}
];

export const dataOnto = [
  {'classes': [
    'pizza_onto.CheeseTopping',
    'pizza_onto.FishTopping',
    'pizza_onto.MeatTopping',
    'pizza_onto.Pizza',
    'pizza_onto.TomatoTopping',
    'pizza_onto.Topping'
  ]},
  {'object_properties':[
    'pizza_onto.has_topping'
  ]},
  {'data_properties':[
    'pizza_onto.Name'
  ]}
]

export const dataMapping = [
  {"leftSide": "Elemnt123213123123123213231231231313121", "rightSide": ["Element1Right"]},
  {"leftSide": "Elemnt2", "rightSide": ["Element2Right"]},
  {"leftSide": "Elemnt3", "rightSide": ["Element1Right", "Element2same", "Element3same"]},
  {"leftSide": "Elemnt4", "rightSide": ["Element1Right"]},
  {"leftSide": "Elemnt4", "rightSide": ["Element1Right"]},
  {"leftSide": "Elemnt4", "rightSide": ["Element1Right"]},
  {"leftSide": "Elemnt4", "rightSide": ["Element1Right"]},
  {"leftSide": "Elemnt4", "rightSide": ["Element1Right"]},
  {"leftSide": "Elemnt4", "rightSide": ["Element1Right"]},
  {"leftSide": "Elemnt4", "rightSide": ["Element1Right"]},
  {"leftSide": "Elemnt4", "rightSide": ["Element1Right"]},
  {"leftSide": "Elemnt4", "rightSide": ["Element1Right"]},
]
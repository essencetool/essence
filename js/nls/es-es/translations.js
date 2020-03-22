define ({
    "vex": {
        "cancel": "Cancelar"
    },
    
    "common": {
        
        "loading": {
            "title": "Essence<span>Tool</span>",
            "description": "Estamos preparando todo. Por favor, sea paciente"
        },
        
        "message": {
            "controller_not_allowed": "No se te permite estar aquí. Por favor, identifícate.",
            "controller_not_found": "Página no encontrada",
            "indexed_db_not_supported": "Su navegador no es compatible con una versión estable de IndexedDB. Tenga en cuenta que algunos navegadores en modo incógnito pueden desactivarlo."
        },
        
        "controls": {
           "select_all_groups": {
               "text": "Todos los grupos"
           },
           
           "select_all_projects": {
                "text": "Todos los proyectos"
           },
           
           "select_all_rubrics": {
                "text": "Todas las rúbricas"
           },
           
           "select": {
               "placeholder": "Por favor, seleccione una opción"
           },
           
           "include_all_subgroups": {
               "text": "Incluir todos los grupos"
           }
        }
    },
    
    
    "frontend": {
        
        "layout": {
            "main": {
                "header": {
                    "text": "E.s.s.e.n.c.e. <small>tool</small>"
                },
                "footer": {
                    "copyright": {
                        "text": "&copy; Proyecto ESSENCE 2019."
                    }
                },
                "menu": {
                    "items": {
                        "projects": {
                            "text": "<span class='icon-folder-open'></span> Proyectos"
                        },
                        "progress": {
                            "text": "<span class='icon-chart-pie'></span> Estudiantes"
                        },
                        "groups": {
                             "text": "<span class='icon-users'></span> Grupos"
                        },
                        "rate": {
                            "text": "<span class='icon-edit'></span> Evaluaciones"
                        },
                        "import_students": {
                            "text": "<span class='icon-right-big'></span> Importar estudiantes"
                        },
                        "export": {
                            "text": "<span class='icon-left-big'></span> Exportar"
                        },
                        "restore": {
                            "text": "<span class='icon-right-big'></span> Restaurar copia de seguridad"
                        },
                        "assessment": {
                            "text": "<span class='icon-edit'></span> Autoevaluaciones"
                        }
                    }
                }
            }
        },
        
        "pages": {
            "import_students": {
                
                "title": "Importar estudiantes",
                
                "help": {
                    "text": "<p>En esta sección podrá importar una lista de estudiantes y asignarlos automáticamente a un grupo. Tenga en cuenta que los estudiantes solo se pueden incluir una vez, pero pueden pertenecer a muchos grupos. Por lo tanto, si desea tener los mismos estudiantes en muchos grupos, impórtelos nuevamente pero seleccione otro grupo. </p> <p> Puede descargar una plantilla para cargar a sus estudiantes <a href = 'assets/templates/students.csv' download>aquí</a> (<a href='assets/templates/students.xlsx' download> Microsoft Excel </a>)</p>"
                },
                
                "controls": {
                    "group": {
                        "label": "<strong>Passo 1. </strong>Selecionar un grupo o crear uno nuevo"
                    },
                    "file": {
                        "label": "<strong>Passo 2. </strong>Enviar un archivo con los estudiantes",
                        "placeholder": "Seleccione un archivo"
                    },
                    "submit": {
                        "text": "Enviar"
                    }
                },
                
                "messages": {
                    "no_file": "Debe adjuntar un archivo .csv válido para importar",
                    "success": "%success% of %total% estudiantes fueron añadidos al grupo '%group%'"
                }
            },
            
            "restore_backup": {
                
                "title": "Restaurar copia de seguridad",
                
                "help": {
                    "text": "<p>En esta sección, podrá restaurar una copia de seguridad y enviar. Recuerde, toda la información previamente almacenada se perderá</p>"
                },
                
                "controls": {
                    "file": {
                        "label": "Adjunte su última copia de seguridad",
                        "placeholder": "Selecione un archivo"
                    },
                    "submit": {
                        "text": "Enviar"
                    }
                },
                
                "messages": {
                    "no_file": "Debe adjuntar un .json válido para importar",
                    "success": "Base de datos restaurada"
                }
            },
            
            "assessment": {
                
                "title": "Autoevaluaciones",
                
                "help": {
                    "text": "<p> Este formulario puede ayudar a realizar una autoevaluación. Se sugiere repetir una / dos veces al año para ver su propio desarrollo. </p>"
                },
                "controls": {
                    
                    "name": {
                        "label": "Primero, introduce tu nombre completo",
                        "placeholder": "Nombre completo. Ej: John Doe"
                    },
                    
                    "email": {
                        "label": "Agrega un correo electrónico de contacto. En caso de que quieras enviar tus resultados",
                        "placeholder": "Ej: john-doe@sample.com"
                    },
                    
                    "submit": {
                        "text": "Obtener los resultados"
                    }
                }
            },
            
            "export": {
                
                "title": "Exportar",
                
                "help": {
                    "text": "<p> En esta sección puede exportar su base de datos en un archivo. Tenga en cuenta que este archivo incluirá información confidencial sobre los estudiantes que se puede proteger de acuerdo con la ley. Guarde esta información en un lugar seguro y úsela bajo su propio riesgo. </p>"
                },
                
                "controls": {
                    "submit": {
                        "text": "Exportar"
                    }
                },
                
                "messages": {
                    "export_success": "La base de datos ha sido exportada"
                }
            },
            
            
            "projects": {
                "title": "Proyectos",
                
                "help": {
                    "text": "<p> En esta sección puede administrar proyectos. Un proyecto es una forma práctica de organizar sus evaluaciones. </p>"
                },
                
               "confirm": {
                    "delete_projects": "¿Estás seguro de que quieres eliminar estos proyectos? Esta acción no se puede deshacer"
                },
                
                "prompt": {
                    "name": "Por favor, ingrese el nuevo nombre para este proyecto",
                    "description": "Por favor, ingrese la nueva descripción para este proyecto"
                },
                
                "messages": {
                    "success": "El proyecto ha sido actualizado",
                    "ratings_attached": "No se puede eliminar este proyecto. Hay calificaciones vinculadas a él",
                    "delete": "El proyecto ha sido eliminado"
                },
                
                "controls": {
                    "create_project": {
                        "text": "&hellip; o crea uno nuevo"
                    },
                    "update_project": {
                        "text": "Actualiza este proyecto"
                    },
                    "delete_project": {
                        "text": "Eliminar proyectos seleccionados"
                    },
                    "project": {
                        "label": "Busca tu proyecto"
                    },
                    "name": {
                        "label": "Nombre",
                        "placeholder": "Por favor, ingrese lo nuevo de su proyecto"
                    },
                    "description": {
                        "label": "Descripción",
                        "placeholder": "Por favor, escriba una breve descripción sobre su proyecto"
                    },
                    "submit": {
                        "text": "Enviar"
                    }
                }
            },
            
            
            "groups": {
                "title": "Grupos",
                
                "help": {
                    "text": "<p> En esta sección puede administrar grupos. Un grupo es una forma de organizar a los estudiantes en equipos </p>"
                },
                
               "confirm": {
                    "delete_groups": "¿Estás seguro de que deseas eliminar estos grupos? Esta acción no se puede deshacer",
                    "delete_subgroups": "¿Está seguro de que desea eliminar estos subgrupos? Esta acción no se puede deshacer"
                },
                
                "prompt": {
                    "update_name": "Por favor, escriba el nuevo nombre",
                    "name_gruop": "Por favor, escriba el nombre del grupo",
                    "name_subgruop": "Por favor, escriba el nombre del nuevo subgrupo"
                },
                
                "controls": {
                    "create_group": {
                        "text": "Crear nuevo grupo"
                    },
                    "create_subgroup": {
                        "text": "Crear subgrupo"
                    },
                    "delete_group": {
                        "text": "Eliminar grupo"
                    },
                    "delete_subgroup": {
                        "text": "Eliminar subgrupo"
                    }
                },
                
                "messages": {
                    "duplicate_group": "Ya hay un grupo con el mismo nombre.",
                    "duplicate_subgroup": "Ya hay un subgrupo con el mismo nombre."
                }
                
            },
            
            "rate": {
                "title": "Evaluaciones",
                
                "help": {
                    "text": "<p> En esta sección, puede evaluar a los estudiantes. Para hacerlo, debe seleccionar un proyecto, una rúbrica y los estudiantes que desea calificar. </p> <p> Las evaluaciones se pueden realizar individualmente, o puede evaluar un grupo completo o un subgrupo, pero los cambios no serán guardados hasta que califique a los estudiantes. </p> <p> Recuerde que puede ver todas las evaluaciones realizadas desde la sección <a href='#students'> estudiantes </a> </p> <p> Una vez que ha seleccionado el proyecto, la rúbrica y los estudiantes para evaluar, debe marcar cada criterio como <em> muy bueno </em>, <em> bueno </em>, <em> aceptable </em> o < em> inaceptable </em> </p> <p> Es posible incluir evidencias para recordar su evaluación </p>"
                },
                
                "controls": {
                    "project": {
                        "label": "(1) Seleccione un proyecto"
                    },
                    "rubric": {
                        "label": "(2) Seleccione una rúbrica"
                    },
                    "filter": {
                        "label": "(3) Seleccione estudiante, grupo o subgrupo",
                        "optgroup": "Estudiantes"
                    },
                    "rate_action": {
                        "text": "Guardar evaluaciones"
                    },
                    "evidences": {
                        "label": "Incluya cualquier evidencia que quiera recordar"
                    }
                },
                
                "tooltips": {
                    "remove_selection": "Eliminar su selección",
                    "evidences": "Incluir evidencias a este criterio"
                },
                
                "messages": {
                    "success": "La evaluación ha sido registrada",
                    "no_student": "No hay ningún alumno en su selección actual",
                    "no_ratings_to_save": "No hay nada en la selección actual para guardar"
                },
                
                "confirm": {
                    "leave_page": "Hay clasificaciones no guardadas. ¿Estás seguro de salir de esta página?"
                }
            },
            
            "students": {
                
                "title": "Estudiantes",
                
                "controls": {
                    "group": {
                        "label": "Grupo"
                    },
                    "progress": {
                        "text": "Ver progreso"
                    },
                    "edit": {
                        "text": "Editar"
                    }
                },
                
                "tables": {
                    "students": {
                        "fields": {
                            "photo": "Foto",
                            "name": "Nombre",
                            "email": "Email",
                            "groups": "Grupos",
                            "rubrics": "Rúbricas"
                        }
                    }
                }
                
            },
            
            
            "student": {
                
                "title": "Estudiantes",
                
                "controls": {
                    "name": {
                        "label": "Nombre completo",
                        "placeholder": "Escriba el nombre completo del alumno"
                    },
                    "email": {
                        "label": "Identificador",
                        "placeholder": "Un identificador único para el alumno. Por ejemplo, su correo electrónico"
                    },
                    "groups": {
                        "label": "Grupos"
                    },
                    "submit": {
                        "text": "Actualizar"
                    },
                    "delete_student": {
                        "text": "Eliminar este estudiante"
                    }
                },
                
                "messages": {
                    "success": "La información del alumno ha sido actualizada",
                    "delete": "El alumno ha sido eliminado de la base de datos."
                },
                
                "confirm": {
                    "delete": "¿Estás seguro de eliminar a este estudiante? Esta acción no se puede deshacer"
                }
            },
            
            
            "progress": {
                "title": "Progreso del alumno",
                
                "controls": {
                    "project": {
                        "label": "Filtrar por proyecto"
                    },
                    "rubric": {
                        "label": "Filtrar por rúbrica"
                    },
                    "export": {
                        "text": "Exportar resultados"
                    }
                },
                
                "messages": {
                    "no_student": "No se puede encontrar a este alumno en la base de datos"
                }
            }
        }
    }
})
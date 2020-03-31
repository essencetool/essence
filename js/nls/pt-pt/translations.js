define ({
    "vex": {
        "cancel": "Cancelar"
    },
    
    "common": {
        
        "loading": {
            "title": "Essence<span>Tool</span>",
            "description": "Estamos a preparar tudo. Por favor, seja paciente"
        },
        
        "message": {
            "controller_not_allowed": "Acesso boqueado. Efetue o login para aceder",
            "controller_not_found": "Página não encontrada",
            "indexed_db_not_supported": "O seu browser não suporta a versão IndexdDB. Algumas funções não estarão disponíveis."
        },
        
        "controls": {
           "select_all_groups": {
               "text": "Todos os grupos"
           },
           
           "select_all_projects": {
                "text": "Todos os projetos"
           },
           
           "select_all_rubrics": {
                "text": "Todos os rubricas"
           },
           
           "select": {
               "placeholder": "Por favor, selecione uma opção"
           },
           
           "include_all_subgroups": {
               "text": "Incluir todos os subgrupos"
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

                    }
                },
                "menu": {
                    "items": {
                        "projects": {
                            "text": "<span class='icon-folder-open'></span> Projetos"
                        },
                        "progress": {
                            "text": "<span class='icon-chart-pie'></span> Estudantes"
                        },
                        "groups": {
                             "text": "<span class='icon-users'></span> Grupos"
                        },
                        "rate": {
                            "text": "<span class='icon-edit'></span> Avaliações"
                        },
                        "import_students": {
                            "text": "<span class='icon-right-big'></span> Importar estudantes"
                        },
                        "export": {
                            "text": "<span class='icon-left-big'></span> Exportar"
                        },
                        "restore": {
                            "text": "<span class='icon-right-big'></span> Restaurar backup"
                        },
                        "assessment": {
                            "text": "<span class='icon-edit'></span> Autoavaliação"
                        }
                    }
                }
            }
        },
        
        "pages": {
            "import_students": {
                
                "title": "Importar estudantes",
                
                "help": {
                    "text": "<p>Nesta secção poderá importar uma lista de estudantes e atribuir-lhes automaticamente um grupo. Atenção os alunos só podem ser incluídos uma vez, mas podem pertencer a vários grupos. Portanto, se quiser ter os mesmos estudantes em vários grupos, importe-os novamente mas selecione outro grupo.</p><p> Pode fazer o download de um formulário para carregar os seus estudantes <a href='assets/templates/students.csv' download>aqui</a> (<a href='assets/templates/students.xlsx' download>Microsoft Excel</a>)</p>"
                },
                
                "controls": {
                    "group": {
                        "label": "<strong>Passo 1. </strong>Selecione um subgrupo"
                    },
                    "file": {
                        "label": "<strong>Passo 2. </strong>Submeter um ficheiro com os estudantes",
                        "placeholder": "Selecionar um ficheiro"
                    },
                    "submit": {
                        "text": "Submeter"
                    }
                },
                
                "messages": {
                    "no_file": "Precisa anexar um ficheiro válido .csv para importar",
                    "success": "%success% of %total% os estudantes foram adicionados com sucesso a '%group%'"
                }
            },
            
            "restore_backup": {
                
                "title": "Restaurar backup",
                
                "help": {
                    "text": "<p>Nesta seção, você poderá restaurar um backup e enviar. Lembre-se de que todas as informações armazenadas anteriormente serão perdidas</p>"
                },
                
                "controls": {
                    "file": {
                        "label": "Envie seu último ponto de restauração",
                        "placeholder": "Selecione um arquivo"
                    },
                    "submit": {
                        "text": "Enviar"
                    }
                },
                
                "messages": {
                    "no_file": "Você precisa anexar um .json válido para importar",
                    "success": "Banco de dados restaurado"
                }
            },
            
            "assessment": {
                
                "title": "Autoavaliações",
                
                "help": {
                    "text": "<p>Este formulário pode ajudar a realizar a autoavaliação. Recomenda-se repeti-lo uma/duas vezes por ano para ver o seu próprio progresso.</p>"
                },
                "controls": {
                    
                    "name": {
                        "label": "Primeiro, insirir o seu nome completo",
                        "placeholder": "Nome completo"
                    },
                    
                    "email": {
                        "label": "E um contato email, no caso de querer enviar os seus resultados.",
                        "placeholder": "Ex: john-doe@sample.com"
                    },
                    
                    "submit": {
                        "text": "Obter os seus resultados"
                    }
                }
            },
            
            "export": {
                
                "title": "Exportar",
                
                "help": {
                    "text": "<p>Nesta secção pode exportar a sua base de dados num ficheiro.Atenção que este ficheiro incluirá informação confidencial sobre os estudantes que pode estar protegida por lei. Por favor, guarde esta informação num lugar seguro e responsabilize-se pela sua utilização. </p>"
                },
                
                "controls": {
                    "submit": {
                        "text": "Exportar"
                    }
                },
                
                "messages": {
                    "export_success": "A base de dados foi exportada"
                }
            },
            
            
            "projects": {
                "title": "Projetos",
                
                "help": {
                    "text": "<p>Nesta secção pode gerir os projetos. Um projeto é uma forma prática de organizar as suas avaliações.</p>"
                },
                
               "confirm": {
                    "delete_projects": "Tem a certeza que quer apagar estes projetos? Esta ação não pode ser anulada."
                },
                
                "prompt": {
                    "name": "Por favor, insirir o novo nome para este projeto.",
                    "description": "Por favor, insirir a nova descrição deste projeto"
                },
                
                "messages": {
                    "success": "O projeto foi atualizado",
                    "ratings_attached": "Este projeto não pode ser eliminado. Há avaliações associadas",
                    "delete": "O projeto foi eliminado."
                },
                
                "controls": {
                    "create_project": {
                        "text": "&hellip; ou criar um novo"
                    },
                    "update_project": {
                        "text": "Atualizar este projeto"
                    },
                    "delete_project": {
                        "text": "Eliminar os projetos selecionados"
                    },
                    "project": {
                        "label": "Procurar o seu projeto"
                    },
                    "name": {
                        "label": "Nome",
                        "placeholder": "Por favor, insirir o nome do seu projeto"
                    },
                    "description": {
                        "label": "Descrição",
                        "placeholder": "Por favor, descrever sucintamente o seu projeto"
                    },
                    "submit": {
                        "text": "Submeter"
                    }
                }
            },
            
            
            "groups": {
                "title": "Grupos",
                
                "help": {
                    "text": "<p>Nesta secção pode gerir os grupos. Um grupo é uma forma de poder organizar os estudantes em equipas.</p>"
                },
                
               "confirm": {
                    "delete_groups": "Tem a certeza que quer eliminar estes grupos? Esta ação não pode ser anulada.",
                    "delete_subgroups": "Tem a certeza que quer eliminar estes subgrupos? Esta ação não pode ser anulada."
                },
                
                "prompt": {
                    "update_name": "Por favor, digite o novo nome",
                    "name_gruop": "Por favor, indicar o nome do grupo",
                    "name_subgruop": "Por favor, indicar o nome do novo subgrupo"
                },
                
                "controls": {
                    "create_group": {
                        "text": "Criar um novo grupo"
                    },
                    "create_subgroup": {
                        "text": "Criar um subgrupo"
                    },
                    "delete_group": {
                        "text": "Eliminar grupo"
                    },
                    "delete_subgroup": {
                        "text": "Eliminar subgrupo"
                    }
                },
                
                "messages": {
                    "duplicate_group": "Já existe um grupo com o mesmo nome",
                    "duplicate_subgroup": "Já existe um subgrupo com o mesmo nome"
                }
                
            },
            
            "rate": {
                "title": "Avaliações",
                
                "help": {
                    "text": "<p>Nesta secção pode avaliar os estudantes.Para o fazer, precisa selecionar um grupo, uma rubrica e os estudantes que pretende classificar.</p> <p>As avaliações podem ser feitas individualmente, ou pode avaliar todo o grupo ou subgrupo, mas as modificações não serão guardadas até que classifique os estudantes.</p><p>Lembre-se que pode ver todas as avaliações realizadas em <a href='#students'>estudantes</a> section</p><p>Depois de selecionar o projeto, a rubrica e os estudantes a avaliar, deve marcar cada critério como <em>muito-bom</em>, <em>bom</em>, <em>suficiente</em> ou <em>insuficiente</em></p><p>É possível incluir evidências para lembrar a sua avaliação</p>"
                },
                
                "controls": {
                    "project": {
                        "label": "(1) Selecionar um projeto"
                    },
                    "rubric": {
                        "label": "(2) Selecionar uma rubrica"
                    },
                    "filter": {
                        "label": "(3) Selecionar um estudante, grupo ou subgrupo",
                        "optgroup": "Estudantes"
                    },
                    "rate_action": {
                        "text": "Guardar avaliações"
                    },
                    "evidences": {
                        "label": "Incluir evidências que queira recordar"
                    }
                },
                
                "tooltips": {
                    "remove_selection": "Apagar a sua seleção",
                    "evidences": "Incluir evidências para este critério"
                },
                
                "messages": {
                    "success": "A avaliação foi gravada",
                    "no_student": "Não há nenhum estudante na sua seleção atual",
                    "no_ratings_to_save": "Não há nada na seleção atual para gravar"
                },
                
                "confirm": {
                    "leave_page": "Há classificações que não foram gravadas. Tem a certeza que quer sair desta página?"
                }
            },
            
            "students": {
                
                "title": "Estudantes",
                
                "controls": {
                    "group": {
                        "label": "Grupo"
                    },
                    "progress": {
                        "text": "Ver progresso"
                    },
                    "edit": {
                        "text": "Editar"
                    }
                },
                
                "tables": {
                    "students": {
                        "fields": {
                            "photo": "Foto",
                            "name": "Name",
                            "email": "Email",
                            "groups": "Grupos",
                            "rubrics": "Rubricas"
                        }
                    }
                }
                
            },
            
            
            "student": {
                
                "title": "Estudantes",
                
                "controls": {
                    "name": {
                        "label": "Nome completo",
                        "placeholder": "Insirir o nome completo do estudante"
                    },
                    "email": {
                        "label": "Email",
                        "placeholder": "Insirir o email do estudante"
                    },
                    "groups": {
                        "label": "Grupos"
                    },
                    "submit": {
                        "text": "Atualizar"
                    },
                    "delete_student": {
                        "text": "Eliminar este estudante"
                    }
                },
                
                "messages": {
                    "success": "A informação do estudante foi atualizada",
                    "delete": "O estudante foi eliminado da base de dados"
                },
                
                "confirm": {
                    "delete": "Tem a certeza que quer eliminar este estudante? Esta ação não pode ser anulada"
                }
            },
            
            
            "progress": {
                "title": "Progresso do estudante",
                
                "controls": {
                    "project": {
                        "label": "Filtar por projeto"
                    },
                    "rubric": {
                        "label": "Filtar por rubrica"
                    },
                    "export": {
                        "text": "Exportar resultados"
                    }
                },
                
                "messages": {
                    "no_student": "Não encontro este estudante na base de dados"
                }
            }
        }
    }
})
define({
    "vex": {
        "cancel": "Cancellare"
    },
    
    "common": {
        
        "loading": {
            "title": "Essence<span>Tool</span>",
            "description": "Stiamo preparando tutto. Per favore, un po' di pazienza"
        },
        
        "message": {
            "controller_not_allowed": "Non sei autorizzato in questa sezione. Accedi con le tue credenziali.",
            "controller_not_found": "Pagina non trovata",
            "indexed_db_not_supported": "Il tuo brower non supporta la versione in IndexdDB. Alcune proprietà potrebbero non essere disponibili. "
        },
        
        "controls": {
           "select_all_groups": {
               "text": "Tutti i gruppi"
           },
           
           "select_all_projects": {
                "text": "Tutti i progetti"
           },
           
           "select_all_rubrics": {
                "text": "Tutte le rubriche"
           },
           
           "select": {
               "placeholder": "Per favore, seleziona un'opzione"
           },
           
           "include_all_subgroups": {
               "text": "Includi tutti i sottogruppi"
           }
        }
    },
    
    
    "frontend": {
        
        "layout": {
            "main": {
                "header": {
                    "text": "IT E.s.s.e.n.c.e. <small>tool</small>"
                },
                "footer": {
                    "copyright": {
                        "text": "&copy; Proyecto ESSENCE 2019."
                    }
                },
                "menu": {
                    "items": {
                        "projects": {
                            "text": "<span class='icon-folder-open'></span> Progetti"
                        },
                        "progress": {
                            "text": "<span class='icon-chart-pie'></span> Studenti"
                        },
                        "groups": {
                             "text": "<span class='icon-users'></span> Gruppi"
                        },
                        "rate": {
                            "text": "<span class='icon-edit'></span> Valutazioni"
                        },
                        "import_students": {
                            "text": "<span class='icon-right-big'></span> Importare studenti"
                        },
                        "export": {
                            "text": "<span class='icon-left-big'></span> Esportare"
                        },
                        "restore": {
                            "text": "<span class='icon-right-big'></span> Ripristinare il backup"
                        },
                        "assessment": {
                            "text": "<span class='icon-edit'></span> Autovalutazione"
                        }
                    }
                }
            }
        },
        
        "pages": {
            "import_students": {
                
                "title": "Importare studenti",
                
                "help": {
                    "text": "<p>In questa sezione è possibile importare una lista di studenti ed assegnarli automaticamente ad un gruppo. Tieni conto che gli studenti possono essere inseriti una sola volta, ma possono appartenere a più gruppi. Quindi, se vuoi avere gli stessi studenti in più gruppi, importali di nuovo ma seleziona un altro gruppo.</p><p> Puoi scaricare un modello per caricare i tuoi studenti <a href='assets/templates/students.csv' download>qui</a> (<a href='assets/templates/students.xlsx' download>Microsoft Excel</a>)</p>"
                },
                
                  
                
                "controls": {
                    "group": {
                        "label": "<strong>Step 1. </strong>Seleziona un gruppo o creane uno nuovo"
                    },
                    "file": {
                        "label": "<strong>Step 2. </strong> Invia il file con gli studenti",
                        "placeholder": "Seleziona un file"
                    },
                    "submit": {
                        "text": "Invia"
                    }
                },
                
                "messages": {
                    "no_file": "È necessario allegare un file.csv valido",
                    "success": "%success% del %total% studenti è stato aggiunto con successo al '%group%'"
                }
            },
            
            "restore_backup": {
                
                "title": "Ripristinare il backup",
                
                "help": {
                    "text": "<p>In questa sezione sarà possibile ripristinare un backup e inviare. Ricorda che tutte le informazioni precedentemente memorizzate andranno perse</p>"
                },
                
                "controls": {
                    "file": {
                        "label": "Invia la tua ultima versione",
                        "placeholder": "Seleziona un file"
                    },
                    "submit": {
                        "text": "Importare"
                    }
                },
                
                "messages": {
                    "no_file": "Devi importare un .json valido per importare",
                    "success": "Database ripristinato"
                }
            },
            
            "assessment": {
                
                "title": "Autovalutazione",
                
                "help": {
                    "text": "<p> Questo questionario può aiutare a realizzare l'autovalutazione. Si raccomanda di ripeterlo una/due volte l'anno per monitorare il proprio progresso.</p>"
                },
                "controls": {
                    
                    "name": {
                        "label": "Inizia inserendo nome e cognome",
                        "placeholder": "Nome e cognome  Es: Mario Rossi"
                    },
                    
                    "email": {
                        "label": "Aggiungi un indirizzo email se desideri ricevere i tuoi risultati",
                        "placeholder": "Esempio: mario.rossi@sample.com"
                    },
                    
                    "submit": {
                        "text": "Ottieni i tuoi risultati"
                    }
                }
            },
            
            "export": {
                
                "title": "Esportare",
                
                "help": {
                    "text": "<p>In questa sezione puoi esportare i tuoi dati in un file.  Ricorda che il file contiene informazioni personali sugli studenti che potrebbero essere protette in base alla legge. Per favore, conserva queste informazioni in luogo sicuro e usale sotto la tua responsabilità.</p>"
                },
                
                "controls": {
                    "submit": {
                        "text": "Esportare"
                    }
                },
                
                "messages": {
                    "export_success": "I dati sono stati esportati"
                }
            },
            
            
            "projects": {
                "title": "Progetti",
                
                "help": {
                    "text": "<p>In questa sezione puoi gestire i progetti. Un progetto è un modo pratico di organizzare le valutazioni.</p>"
                },
                
               "confirm": {
                    "delete_projects": "Sei sicuro di voler eliminare questi progetti? Questa azione non potrà essere annullata"
                },
                
                "prompt": {
                    "name": "Per favore, inserisci un nuovo nome per questo progetto",
                    "description": "Per favore, inserisci una descrizione per questo progetto"
                },
                
                "messages": {
                    "success": "Il progetto è stato aggiornato",
                    "ratings_attached": "Questo progetto non si può cancellare perchè esiste un punteggio allegato",
                    "delete": "Il progetto è stato cancellato"
                },
                
                "controls": {
                    "create_project": {
                        "text": "&hellip; o creane uno nuovo"
                    },
                    "update_project": {
                        "text": "Aggiorna il tuo progetto"
                    },
                    "delete_project": {
                        "text": "Elimina tutti i progetti selezionati"
                    },
                    "project": {
                        "label": "Cerca il tuo progetto"
                    },
                    "name": {
                        "label": "Nome",
                        "placeholder": "Per favore, inserisci il nome del tuo progetto"
                    },
                    "description": {
                        "label": "Descrizione",
                        "placeholder": "Per favore, scrivi una breve descrizione del tuo progetto"
                    },
                    "submit": {
                        "text": "Invia"
                    }
                }
            },
            
            
            "groups": {
                "title": "Gruppi",
                
                "help": {
                    "text": "<p>In questa sezione puoi gestire i gruppi. Un gruppo è un modo per organizzare gli studenti in team</p>"
                },
                
               "confirm": {
                    "delete_groups": "Sei sicuro di volere eliminare questi gruppi? Questa operazione non si potrà annullare",
                    "delete_subgroups": "Sei sicuro di volere eliminare questi sottogruppi? Questa operazione non si potrà annullare"
                },
                
                "prompt": {
                    "name_gruop": "Per favore, scrivi il nome del gruppo",
                    "name_subgruop": "Per favore, scrivi il nome del nuovo sottogruppo"
                },
                
                "controls": {
                    "create_group": {
                        "text": "Crea un nuovo gruppo"
                    },
                    "create_subgroup": {
                        "text": "Crea il sottogruppo"
                    },
                    "delete_group": {
                        "text": "Elimina il gruppo"
                    },
                    "delete_subgroup": {
                        "text": "Elimina il sottogruppo"
                    }
                },
                
                "messages": {
                    "duplicate_group": "Esiste già un gruppo con questo nome",
                    "duplicate_subgroup": "Esiste già un sottogruppo con questo nome"
                }
                
            },
            
            "rate": {
                "title": "Valutazioni",
                
                "help": {
                    "text": "<p>In questa sezione puoi valutare gli studenti. Per farlo devi selezionare un progetto, una rubrica e gli studenti che vuoi valutare.</p> <p>Le valutazioni possono essere effettuate individualmente, per gruppo o sottogruppo, ma i cambiamenti non saranno salvati fino alla valutazione degli studenti.</p><p>Ricorda che si possono vedere tutte le valutazioni <a href='#students'>degli studenti</a> nella sezione</p><p>Una volta selezionati il progetto, la rubrica e gli studenti da valutare, dovrai segnare ogni criterio come  <em>molto buono</em>, <em>buono</em>, <em>accettabile</em> o <em>inaccettabile</em></p><p>È possibile inserire le prove per ricordare la valutazione</p>"
                },
                
                "controls": {
                    "project": {
                        "label": "(1) Seleziona un progetto"
                    },
                    "rubric": {
                        "label": "(2) Seleziona una rubrica"
                    },
                    "filter": {
                        "label": "(3) Seleziona studente, gruppo o sottogruppo",
                        "optgroup": "Studenti"
                    },
                    "rate_action": {
                        "text": "Salva le valutazioni"
                    },
                    "evidences": {
                        "label": "Inserisci le prove che vuoi registrare"
                    }
                },
                
                "tooltips": {
                    "remove_selection": "Cancella la selezione",
                    "evidences": "Inserisci prove/osservazioni"
                },
                
                "messages": {
                    "success": "Questa valutazione è stata registrata",
                    "no_student": "Non ci sono studenti in questa selezione",
                    "no_ratings_to_save": "Non c'è niente da salvare in questa selezione"
                },
                
                "confirm": {
                    "leave_page": "Ci sono punteggi non salvati. Sei sicuro di voler uscire?"
                }
            },
            
            "students": {
                
                "title": "Studenti",
                
                "controls": {
                    "group": {
                        "label": "Gruppo"
                    },
                    "progress": {
                        "text": "Visualizza progresso"
                    },
                    "edit": {
                        "text": "Modifica"
                    }
                },
                
                "tables": {
                    "students": {
                        "fields": {
                            "photo": "Foto",
                            "name": "Name",
                            "email": "Email",
                            "groups": "Gruppi",
                            "rubrics": "Rubriche"
                        }
                    }
                }
                
            },
            
            
            "student": {
                
                "title": "Studente",
                
                "controls": {
                    "name": {
                        "label": "Nome e cognome",
                        "placeholder": "Scrivi nome e cognome dello studente"
                    },
                    "email": {
                        "label": "Indirizzo email",
                        "placeholder": "Scrivi l'indirizzo email dello studente"
                    },
                    "groups": {
                        "label": "Gruppi"
                    },
                    "submit": {
                        "text": "Aggiorna"
                    },
                    "delete_student": {
                        "text": "Elimina questo studente"
                    }
                },
                
                "messages": {
                    "success": "Le informazioni sullo studente sono state aggiornate",
                    "delete": "Lo studente è stato cancellato dal database"
                },
                
                "confirm": {
                    "delete": "Sei sicuro di voler eliminare questo studente? Questa operazione non si potrà annullare"
                }
            },
            
            
            "progress": {
                "title": "Progresso dello studente",
                
                "controls": {
                    "project": {
                        "label": "Filtrare per progetto"
                    },
                    "rubric": {
                        "label": "Filtrare per rubrica"
                    },
                    "export": {
                        "text": "Esportare i risultati"
                    }
                },
                
                "messages": {
                    "no_student": "Impossibile trovare questo studente nel database"
                }
            }
        }
    }
});
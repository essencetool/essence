define ({
    "vex": {
        "cancel": "Avbryt"
    },
    
    "common": {
        
        "loading": {
            "title": "Essence<span>Tool</span>",
            "description": "Laddar... Var god vänta"
        },
        
        "message": {
            "controller_not_allowed": "Det här avsnittet är låst, var god logga in.",
            "controller_not_found": "Sidan hittades inte",
            "indexed_db_not_supported": "Din webbläsare stödjer inte en stabil verson av IndexedDB"
        },
        
        "controls": {
           "select_all_groups": {
               "text": "Alla grupper"
           },
           
           "select_all_projects": {
                "text": "Alla projekt"
           },
           
           "select_all_rubrics": {
                "text": "Alla rubriker"
           },
           
           "select": {
               "placeholder": "Vänligen välj ett alternativ"
           },
           
           "include_all_subgroups": {
               "text": "Inkludera alla undergrupper"
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
                        "text": "&copy; Projekt ESSENCE 2019."
                    }
                },
                "menu": {
                    "items": {
                        "projects": {
                            "text": "<span class='icon-folder-open'></span> Projekt"
                        },
                        "progress": {
                            "text": "<span class='icon-chart-pie'></span> Elever"
                        },
                        "groups": {
                             "text": "<span class='icon-users'></span> Grupper"
                        },
                        "rate": {
                            "text": "<span class='icon-edit'></span> Utvärderingar"
                        },
                        "import_students": {
                            "text": "<span class='icon-right-big'></span> Lägg till elever"
                        },
                        "export": {
                            "text": "<span class='icon-left-big'></span> Exportera"
                        },
                        "assessment": {
                            "text": "<span class='icon-edit'></span> Självbedömning"
                        }
                    }
                }
            }
        },
        
        "pages": {
            "import_students": {
                
                "title": "Lägg till elever",
                
                "help": {
                    "text": "<p>I det här avsnittet kommer du att kunna lägga till en lista med elever och automatiskt tilldela dem en grupp. Notera att en elev endast kan läggas till i en grupp en gång, men samma elev kan tillhöra många olika grupper. Om du vill ha en specifik elev i många olika grupper, lägg till eleven en gång till men välj en annan grupp. </p><p>Du kan ladda ner en mall för att lägga till dina elever <a href='assets/templates/students.csv' download>här</a> (<a href='assets/templates/students.xlsx' download>Microsoft Excel</a>)</p>"
                },
                
                "controls": {
                    "group": {
                        "label": "<strong>Steg 1. </strong>Välj en befintlig grupp eller skapa en ny grupp"
                    },
                    "file": {
                        "label": "<strong>Step 2. </strong>Skicka en fil med elever",
                        "placeholder": "Välj fil"
                    },
                    "submit": {
                        "text": "Skicka"
                    }
                },
                
                "messages": {
                    "no_file": "Du måste infoga ett giltigt filnamn.csv ",
                    "success": "%success% av %totalen% elever lades till '%group%"
                }
            },
            
            "assessment": {
                
                "title": "Självbedömning",
                
                "help": {
                    "text": "<p>Med det här formuläret kan du göra en enkel utvärdering av dina entreprenöriella förmågor. Vi rekommenderar att upprepa en till två gånger om året för att se din egen utveckling</p>"
                },
                "controls": {
                    
                    "name": {
                        "label": "Fyll i ditt fullständiga namn",
                        "placeholder": "För- och efternamn "
                    },
                    
                    "email": {
                        "label": "Ange din mailadress. Om du vill skicka dina resultat.",
                        "placeholder": "Tex: john-doe@sample.com"
                    },
                    
                    "submit": {
                        "text": "Hämta resultat"
                    }
                }
            },
            
            "export": {
                
                "title": "Exportera",
                
                "help": {
                    "text": "<p>Här kan du exportera din databas. Observera att den exporterade filen kommer att innehålla konfidentiell information om elever som eventuellt skyddas enligt lag. Förvara denna information på ett säkert ställe.</p>"
                },
                
                "controls": {
                    "submit": {
                        "text": "Exportera"
                    }
                },
                
                "messages": {
                    "export_success": "Databasen har exporterats"
                }
            },
            
            
            "projects": {
                "title": "Projekt  ",
                
                "help": {
                    "text": "<p>Här kan du på ett praktiskt sätt hantera och organisera dina projekt.</p>"
                },
                
               "confirm": {
                    "delete_projects": "Är du säker på att du vill radera dessa projekt? Du kan inte ångra ditt val senare."
                },
                
                "prompt": {
                    "name": "Ange ett namn för projeket.",
                    "description": "Ange en beskrivning av projektet."
                },
                
                "messages": {
                    "success": "Projektet har uppdaterats",
                    "ratings_attached": "Det här projektet kan inte raderas. Det finns betyg bifogade",
                    "delete": "Det här projektet har raderats"
                },
                
                "controls": {
                    "create_project": {
                        "text": "&hellip; eller skapa ett nytt"
                    },
                    "update_project": {
                        "text": "Uppdatera det här projektet"
                    },
                    "delete_project": {
                        "text": "Radera valda projekt"
                    },
                    "project": {
                        "label": "Sök efter ditt projekt"
                    },
                    "name": {
                        "label": "Namn",
                        "placeholder": "Ange det nya namnet för ditt projekt"
                    },
                    "description": {
                        "label": "Beskrivning",
                        "placeholder": "Skriv en kort beskrivning av ditt projekt"
                    },
                    "submit": {
                        "text": "Skicka"
                    }
                }
            },
            
            
            "groups": {
                "title": "Grupper",
                
                "help": {
                    "text": "<p>I det här avsnittet kan du hantera dina grupper. Du organiserar dina elever genom att placera dem i olika grupper.</p>"
                },
                
               "confirm": {
                    "delete_groups": "Är du säker på att du vill radera dessa grupper? Du kan inte ångra ditt val senare.",
                    "delete_subgroups": "Är du säker på att du vill radera dessa undergrupper? Du kan inte ångra ditt val senare."
                },
                
                "prompt": {
                    "name_gruop": "Ange ett namn för din undergrupp.",
                    "name_subgruop": "Ange namnet på den nya undergruppen"
                },
                
                "controls": {
                    "create_group": {
                        "text": "Skapa en ny grupp"
                    },
                    "create_subgroup": {
                        "text": "Skapa en ny undergrupp"
                    },
                    "delete_group": {
                        "text": "Radera grupp"
                    },
                    "delete_subgroup": {
                        "text": "Radera undergrupp"
                    }
                },
                
                "messages": {
                    "duplicate_group": "Det finns redan en grupp med samma namn",
                    "duplicate_subgroup": "Det finns redan en undergrupp med samma namn"
                }
                
            },
            
            "rate": {
                "title": "Utvärderingar",
                
                "help": {
                    "text": "<p>I det här avsnittet kan du utvärdera eleverna. För att göra detta måste du först välja ett projekt, en rubrik och vilka elever du vill göra bedömningen på. Utvärderingarna kan göras individuellt, i grupp eller i undergrupp, men ändringar kommer inte att sparas förrän du bedömt eleverna.</p><p>. Kom ihåg att du kan få en översikt över alla genomförda utvärderingar.<a href='#students'>students's</a> section</p><p> När du har valt projekt, rubrik och vilka elever du ska utvärdera, så väljer du kriterie, mycket väl godkänd, väl godkänd, godkänd eller ej godkänd. <em>mycket väl godkänd</em>, <em>väl godkänd</em>, <em>godkänd</em> or <em>ej godkänd</em></p><p>Det är möjligt att föra anteckningar över bedömningsunderlag för att minnas din utvärdering</p>"
                },
                
                "controls": {
                    "project": {
                        "label": "(1) Välj ett projekt"
                    },
                    "rubric": {
                        "label": "(2) Välj rubrik"
                    },
                    "filter": {
                        "label": "(3) Välj elev, grupp eller undergrupp",
                        "optgroup": "Elever"
                    },
                    "rate_action": {
                        "text": "Spara utvärderingar"
                    },
                    "evidences": {
                        "label": "Inkludera argument du vill minnas"
                    }
                },
                
                "tooltips": {
                    "remove_selection": "Ta bort ditt val/ångra ditt val",
                    "evidences": "Inkludera bedömningsunderlag för det här kriteriet"
                },
                
                "messages": {
                    "success": "Utvärderingen har registrerats",
                    "no_student": "Du har inte angett några elever",
                    "no_ratings_to_save": "Det finns inget innehåll att spara"
                },
                
                "confirm": {
                    "leave_page": "Det finns bedömningar som inte är sparade, vill du verkligen lämna den här sidan?"
                }
            },
            
            "students": {
                
                "title": "Elever",
                
                "controls": {
                    "group": {
                        "label": "Grupp"
                    },
                    "progress": {
                        "text": "Se översikt/Se framsteg"
                    },
                    "edit": {
                        "text": "Ändra"
                    }
                },
                
                "tables": {
                    "students": {
                        "fields": {
                            "photo": "Foto",
                            "name": "Namn",
                            "email": "E-post",
                            "groups": "Grupper",
                            "rubrics": "Rubrics"
                        }
                    }
                }
                
            },
            
            
            "student": {
                
                "title": "Elev ",
                
                "controls": {
                    "name": {
                        "label": "Fullständigt namn",
                        "placeholder": "Fyll i elevens fullständiga namn"
                    },
                    "email": {
                        "label": "E-post",
                        "placeholder": "Fyll i elevens e-postadress"
                    },
                    "groups": {
                        "label": "Grupper"
                    },
                    "submit": {
                        "text": "Uppdatera"
                    },
                    "delete_student": {
                        "text": "Radera den här eleven"
                    }
                },
                
                "messages": {
                    "success": "Elevens uppgifter har uppdaterats",
                    "delete": "Eleven har raderats från databasen"
                },
                
                "confirm": {
                    "delete": "Är du säker på att du vill radera den här eleven? Du kan inte ångra ditt val senare"
                }
            },
            
            
            "progress": {
                "title": "Elevens utveckling/framsteg",
                
                "controls": {
                    "project": {
                        "label": "Sortera efter projekt"
                    },
                    "rubric": {
                        "label": "Sortera efter rubric"
                    },
                    "export": {
                        "text": "Exportera resultat"
                    }
                },
                
                "messages": {
                    "no_student": "Eleven kan inte hittas i databasen"
                }
            }
        }
    }
})
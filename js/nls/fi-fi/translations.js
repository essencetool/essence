define ({
    "vex": {
        "cancel": "Peruuta"
    },
    
    "common": {
        
        "loading": {
            "title": "Essence<span>Tool</span>",
            "description": "Valmistellaan. Pyydämme kärsivällisyyttä&hellip"
        },
        
        "message": {
            "controller_not_allowed": "Sinulla ei ole oikeuksia tänne. Anna varmennustiedot.",
            "controller_not_found": "Sivua ei löydy",
            "indexed_db_not_supported": "Selaimesi ei tue IndexedDB:n tätä versiota. Toiminto ei ole käytössä."
        },
        
        "controls": {
           "select_all_groups": {
               "text": "Kaikki ryhmät"
           },
           
           "select_all_projects": {
                "text": "Kaikki projektit"
           },
           
           "select_all_rubrics": {
                "text": "Kaikki ohjeet"
           },
           
           "select": {
               "placeholder": "Valitse vaihtoehto"
           },
           
           "include_all_subgroups": {
               "text": "Sisällytä kaikki alaryhmät"
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
                        "text": "&copy; projekti ESSENCE 2019."
                    }
                },
                "menu": {
                    "items": {
                        "projects": {
                            "text": "<span class='icon-folder-open'></span> Projektit"
                        },
                        "progress": {
                            "text": "<span class='icon-chart-pie'></span> Opiskelijat"
                        },
                        "groups": {
                             "text": "<span class='icon-users'></span> Ryhmät"
                        },
                        "rate": {
                            "text": "<span class='icon-edit'></span> Arvioinnit"
                        },
                        "import_students": {
                            "text": "<span class='icon-right-big'></span> Tuo opiskelijat"
                        },
                        "export": {
                            "text": "<span class='icon-left-big'></span> Vie"
                        },
                        "assessment": {
                            "text": "<span class='icon-edit'></span> Itsearvioinnit"
                        }
                    }
                }
            }
        },
        
        "pages": {
            "import_students": {
                
                "title": "Tuo opiskelijat",
                
                "help": {
                    "text": "<p>Tässä osiossa voit tuoda luettelon opiskelijoista ja valita heidät automaattisesti johonkin ryhmään. Huomaa että opiskelijan voi nimetä vain kerran mutta yksi opiskelija voi kuulua useaan ryhmään. Jos haluat saman opiskelijan useaan ryhmään, sinun on tuotava hänet uudelleen mutta valittava toinen ryhmä. </p><p>Voit ladata pohjan johon tuot opiskelijat <a href='assets/templates/students.csv' download>here</a></p>"
                },
                
                "controls": {
                    "group": {
                        "label": "<strong>Step 1. </strong>Valitse ryhmä tai luo uusi"
                    },
                    "file": {
                        "label": "<strong>Step 2. </strong>Lähetä tiedosto johon opiskelijat on tuotu",
                        "placeholder": "Valitse tiedosto"
                    },
                    "submit": {
                        "text": "Lähetä"
                    }
                },
                
                "messages": {
                    "no_file": "Sinun on liitettävä yksi kelvollinen .csv tuotavaksi",
                    "success": "%success% yhteensä  %total% opiskelijasta liitettiin onnistuneesti ryhmään '%group%'"
                }
            },
            
            "assessment": {
                
                "title": "Itsearvioinnit",
                
                "help": {
                    "text": "<p>Tämä lomakkeen avulla voit tehdä itsearvioinnin. Suosittelemme itsearvioinnin tekemistä kerran tai kaksi vuodessa että näet oman kehittymisesi. </p>"
                },
                "controls": {
                    
                    "name": {
                        "label": "Kirjoita tähän koko nimesi",
                        "placeholder": "Koko nimi. Esim.: John Doe"
                    },
                    
                    "email": {
                        "label": "Anna sähköpostiosoitteesi tulosten mahdollista lähettämistä varten.",
                        "placeholder": "Esim.: john-doe@sample.com"
                    },
                    
                    "submit": {
                        "text": "Hae tulokset"
                    }
                }
            },
            
            "export": {
                
                "title": "Vie",
                
                "help": {
                    "text": "<p>Tässä osiossa voit viedä tietokantasi tiedostoon. Huomaa että tämä tiedosto sisältää  opiskelijoista sellaista luottamuksellista tietoa, joka on lain mukaan suojattavaa. Pidä nämä tiedot varmassa paikassa, käytät tietoja omalla vastuullasi.  </p>"
                },
                
                "controls": {
                    "submit": {
                        "text": "Vie"
                    }
                },
                
                "messages": {
                    "export_success": "Tietokanta on viety"
                }
            },
            
            
            "projects": {
                "title": "Projektit",
                
                "help": {
                    "text": "<p>Tässä osiossa voi hallinnoida projekteja. Projektointi on kätevä tapa organisoida arviointejasi. </p>"
                },
                
               "confirm": {
                    "delete_projects": "Haluatko varmasti poistaa nämä projektit? Tätä toimintoa ei voi peruuttaa. "
                },
                
                "prompt": {
                    "name": "Anna projektille nimi",
                    "description": "Syötä projektin kuvaus"
                },
                
                "messages": {
                    "success": "Projekti on päivitetty",
                    "ratings_attached": "Tätä projektia ei voi poistaa. Siihen on liitetty arviointeja",
                    "delete": "Projekti on poistettu"
                },
                
                "controls": {
                    "create_project": {
                        "text": "&hellip; tai luo uusi"
                    },
                    "update_project": {
                        "text": "Päivitä tämä projekti"
                    },
                    "delete_project": {
                        "text": "Poista valitut projektit"
                    },
                    "project": {
                        "label": "Etsi omat projektisi"
                    },
                    "name": {
                        "label": "Nimi",
                        "placeholder": "Syötä projektisi uusi nimi"
                    },
                    "description": {
                        "label": "Kuvaus",
                        "placeholder": "Kirjoita lyhyt kuvaus projektistasi"
                    },
                    "submit": {
                        "text": "Lähetä"
                    }
                }
            },
            
            
            "groups": {
                "title": "Ryhmät",
                
                "help": {
                    "text": "<p>Tässä osiossa voit hallinnoida ryhmiäsi. Ryhmittelyn avulla voit organisoida opiskelijatiimejä</p>"
                },
                
               "confirm": {
                    "delete_groups": "Haluatko varmasti poistaa nämä ryhmät? Toimintoa ei voi peruuttaa. ",
                    "delete_subgroups": "Haluatko varmasti poistaa nämä alaryhmät? Toimintoa ei voi peruuttaa. "
                },
                
                "prompt": {
                    "name_gruop": "Kirjoita ryhmän nimi ",
                    "name_subgruop": "Kijroita uuden alaryhmän nimi "
                },
                
                "controls": {
                    "create_group": {
                        "text": "Luo uusi ryhmä"
                    },
                    "create_subgroup": {
                        "text": "Luo alaryhmä"
                    },
                    "delete_group": {
                        "text": "Poista ryhmä"
                    },
                    "delete_subgroup": {
                        "text": "Poista alaryhmä"
                    }
                },
                
                "messages": {
                    "duplicate_group": "Samanniminen ryhmä on jo olemassa ",
                    "duplicate_subgroup": "Samanniminen alaryhmä on jo olemassa"
                }
                
            },
            
            "rate": {
                "title": "Arvioinnit",
                
                "help": {
                    "text": "<p>Tässä osiossa voit arvioida opiskelijoita. Sinun pitää ensin valita projekti, kategoria sekä opiskelijat jotka haluat arvioida. </p> <p>Voit tehdä arvioinnin henkilö kerrallaan, tai voit arvioida koko ryhmän tai alaryhmät, mutta muutokset eivät tallennu ennen kuin olet arvioinut opiskelijat.</p><p>Muista että naet annetut arvioinnit osiosta <a href='#students'>opiskelijat</a> section</p><p>Kun olet valinnut projektin, kategorian sekä arvioitavat opiskelijat, anna arvioiksi seuraavat <em>hyvin hyvä</em>, <em>hyvä</em>, <em>tyydyttävä</em> or <em>ei hyväksytty</em></p><p>Arviointiin on mahdollista lisätä huomioita joiden avulla muistat arviosi</p>"
                },
                
                "controls": {
                    "project": {
                        "label": "(1) Valitse projekti"
                    },
                    "rubric": {
                        "label": "(2) Valitse kategoria"
                    },
                    "filter": {
                        "label": "(3) Valitse opiskelija, ryhmä tai alaryhmä",
                        "optgroup": "Opiskelijat"
                    },
                    "rate_action": {
                        "text": "Tallenna arvioinnit"
                    },
                    "evidences": {
                        "label": "Sisällytä huomiot jotka haluat muistaa"
                    }
                },
                
                "tooltips": {
                    "remove_selection": "Poista valinnat",
                    "evidences": "Sisällytä huomiot tähän kriteeriin"
                },
                
                "messages": {
                    "success": "Arviointi on tallennettu",
                    "no_student": "Tässä valinnassa ei ole yhtään opiskelijaa",
                    "no_ratings_to_save": "Nykyisessä valinnassa ei ole mitään tallennettavaa"
                },
                
                "confirm": {
                    "leave_page": "Tässä osiossa on tallentamattomia arvosteluja. Haluatko varmasti poistua sivulta? "
                }
            },
            
            "students": {
                
                "title": "Opiskelijat",
                
                "controls": {
                    "group": {
                        "label": "Opiskelijat"
                    },
                    "progress": {
                        "text": "Ryhmä"
                    },
                    "edit": {
                        "text": "Muokkaa"
                    }
                },
                
                "tables": {
                    "students": {
                        "fields": {
                            "photo": "Kuva",
                            "name": "Nimi",
                            "email": "Sähköposti",
                            "groups": "Ryhmät",
                            "rubrics": "Ohjeet"
                        }
                    }
                }
                
            },
            
            
            "student": {
                
                "title": "Opiskelija",
                
                "controls": {
                    "name": {
                        "label": "Koko nimi",
                        "placeholder": "Anna opiskelijan koko nimi"
                    },
                    "email": {
                        "label": "Sähköposti",
                        "placeholder": "Anna opiskelijan sähköpostiosoite"
                    },
                    "groups": {
                        "label": "Ryhmät"
                    },
                    "submit": {
                        "text": "Päivitä"
                    },
                    "delete_student": {
                        "text": "Poista tämä opiskelija"
                    }
                },
                
                "messages": {
                    "success": "Opiskelijan tiedot on päivitetty",
                    "delete": "Opiskelija on poistettu tietokannasta"
                },
                
                "confirm": {
                    "delete": "Haluatko varmasti poistaa tämän opiskelijan? Toimintoa ei voi peruuttaa."
                }
            },
            
            
            "progress": {
                "title": "Opiskelijan edistyminen",
                
                "controls": {
                    "project": {
                        "label": "Suodata projekteittain"
                    },
                    "rubric": {
                        "label": "Suodata ohjeistoittain"
                    },
                    "export": {
                        "text": "Vie tulokset"
                    }
                },
                
                "messages": {
                    "no_student": "Opiskelijaa ei löydy tietokannasta"
                }
            }
        }
    }
})
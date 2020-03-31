define ({
    "vex": {
        "cancel": "Anuluj"
    },
    
    "common": {
        
        "loading": {
            "title": "Essence<span>Narzędzie</span>",
            "description": "Przygotowujemy wszystko. Prosimy o cierpliwość i pomoc"
        },
        
        "message": {
            "controller_not_allowed": "Nie możesz tu być. Proszę się uwierzytelnić.",
            "controller_not_found": "Nie odnaleziono strony",
            "indexed_db_not_supported": "Twoja przeglądarka nie obsługuje stabilnej wersji IndexedDB. Taka i taka funkcja nie będzie dostępna."
        },
        
        "controls": {
           "select_all_groups": {
               "text": "Wszytskie grupy"
           },
           
           "select_all_projects": {
                "text": "Wszystkie projekty"
           },
           
           "select_all_rubrics": {
                "text": "Wszytskie rubryki"
           },
           
           "select": {
               "placeholder": "Proszę wybrać opcję"
           },
           
           "include_all_subgroups": {
               "text": "Uwzględnij wszytskie subgrupy"
           }
        }
    },
    
    
    "frontend": {
        
        "layout": {
            "main": {
                "header": {
                    "text": "E.s.s.e.n.c.e. <small>narzędzie</small>"
                },
                "footer": {
                    "copyright": {

                    }
                },
                "menu": {
                    "items": {
                        "projects": {
                            "text": "<span class='icon-folder-open'></span> Projekty"
                        },
                        "progress": {
                            "text": "<span class='icon-chart-pie'></span> Studenci"
                        },
                        "groups": {
                             "text": "<span class='icon-users'></span> Groupy"
                        },
                        "rate": {
                            "text": "<span class='icon-edit'></span> Ewaluacja"
                        },
                        "import_students": {
                            "text": "<span class='icon-right-big'></span> Import uczniów"
                        },
                        "export": {
                            "text": "<span class='icon-left-big'></span> Eksport"
                        },
                        "restore": {
                            "text": "<span class='icon-right-big'></span> Przywracać"
                        },
                        "assessment": {
                            "text": "<span class='icon-edit'></span> Samoocena"
                        }
                    }
                }
            }
        },
        
        "pages": {
            "import_students": {
                
                "title": "Importuj uczniów",
                
                "help": {
                    "text": "<p> W tej sekcji będziesz mógł zaimportować listę uczniów i przypisać ich automatycznie do grupy. Zauważ, że uczniowie mogą zostać uwzględnieni tylko raz, ale mogą należeć do wielu grup. Jeśli więc chcesz mieć tych samych uczniów w wielu grupach, zaimportuj ich ponownie, ale wybierz inną grupę. </p> <p> Możesz pobrać szablon, aby załadować swoich uczniów <a href = 'resources / templates / students.csv „pobierz>tutaj</a> (<a href='assets/templates/students.xlsx' download>Microsoft Excel</a>)</p>"
                },
                
                "controls": {
                    "group": {
                        "label": "<strong>Step 1. </strong>Wybierz podgrupę"
                    },
                    "file": {
                        "label": "<strong>Step 2. </strong>SWybierz plik z uczniami",
                        "placeholder": "Wybierz plik"
                    },
                    "submit": {
                        "text": "Zatwierdź"
                    }
                },
                
                "messages": {
                    "no_file": "Aby zaimportować, musisz dołączyć jeden prawidłowy plik .csv",
                    "success": "%success% z %total% uczniowie zostali dodani do '%group%"
                }
            },
            
            "restore_backup": {
                
                "title": "Przywracania kopii zapasowej",
                
                "help": {
                    "text": "<p>W tej sekcji będziesz mógł przywrócić kopię zapasową i przesłać. Pamiętaj, że wszystkie wcześniej zapisane informacje zostaną utracone</p>"
                },
                
                "controls": {
                    "file": {
                        "label": "Prześlij swój ostatni punkt przywracania",
                        "placeholder": "Wybierz plik"
                    },
                    "submit": {
                        "text": "Importuj bazę danych"
                    }
                },
                
                "messages": {
                    "no_file": "Aby zaimportować, musisz dołączyć jeden prawidłowy plik .json",
                    "success": "Baza danych została przywrócona"
                }
            },
            
            "assessment": {
                
                "title": "Samoocena",
                
                "help": {
                    "text": "<p> Ten formularz służy do przeprowadzenia samooceny. Zaleca się powtarzanie raz / dwa razy w roku, aby zobaczyć swój rozwój. </p>"
                },
                "controls": {
                    
                    "name": {
                        "label": "Po pierwsze, przedstaw się",
                        "placeholder": "Imię i nazwisko. Np: John Doe"
                    },
                    
                    "email": {
                        "label": "I kontaktowy adres e-mail. Na wypadek, gdybyś chciał wysłać swoje wyniki",
                        "placeholder": "Np: john-doe@sample.com"
                    },
                    
                    "submit": {
                        "text": "Otrzymaj swoje rezultaty"
                    }
                }
            },
            
            "export": {
                
                "title": "Exportuj",
                
                "help": {
                    "text": "<p>W tej sekcji możesz wyeksportować bazę danych do pliku. Pamiętaj, że ten plik będzie zawierał poufne informacje o uczniach, które mogą być chronione zgodnie z prawem. Proszę przechowywać te informacje w bezpiecznym miejscu i wykorzystywać je na własne ryzyko.</p>"
                },
                
                "controls": {
                    "submit": {
                        "text": "Eksportuj"
                    }
                },
                
                "messages": {
                    "export_success": "Baza danych została wyeksportowana"
                }
            },
            
            
            "projects": {
                "title": "Projekty",
                
                "help": {
                    "text": "<p>W tej sekcji możesz zarządzać projektami. Projekt to wygodny sposób na uporządkowanie ocen.</p>"
                },
                
               "confirm": {
                    "delete_projects": "Czy na pewno chcesz usunąć te projekty ?. Nie można cofnąć tej akcji"
                },
                
                "prompt": {
                    "name": "Wprowadź nową nazwę tego projektu",
                    "description": "Wprowadź nowy opis tego projektu"
                },
                
                "messages": {
                    "success": "Projekt został zaktualizowany",
                    "ratings_attached": "Nie można usunąć tego projektu. Dołączono oceny",
                    "delete": "Projekt został usunięty"
                },
                
                "controls": {
                    "create_project": {
                        "text": "&hellip; lub utwórz nowy"
                    },
                    "update_project": {
                        "text": "Aktualizuj projekt"
                    },
                    "delete_project": {
                        "text": "Usuń wybrane projekty"
                    },
                    "project": {
                        "label": "Poszukaj twój projekt"
                    },
                    "name": {
                        "label": "Nazwa",
                        "placeholder": "Proszę, napisać krótki opis twojego projektu."
                    },
                    "description": {
                        "label": "Opis",
                        "placeholder": "Proszę, napisać krótki opis twojego projektu."
                    },
                    "submit": {
                        "text": "Złóż"
                    }
                }
            },
            
            
            "groups": {
                "title": "Grupy",
                
                "help": {
                    "text": "<p>W tej sekcji możesz zarządzać grupami. Grupa to sposób organizowania uczniów w zespoły</p>"
                },
                
               "confirm": {
                    "delete_groups": "Czy na pewno chcesz usunąć te grupy?. Nie można cofnąć tej operacji",
                    "delete_subgroups": "Czy na pewno chcesz usunąć te podgrupy?. Nie można cofnąć tej akcji"
                },
                
                "prompt": {
                    "update_name": "Wpisz nową nazwę",
                    "name_gruop": "Proszę wpisać nazwę grupy",
                    "name_subgruop": "Proszę wpisać nazwę nowej subgrupy"
                },
                
                "controls": {
                    "create_group": {
                        "text": "Utwórz nową grupę"
                    },
                    "create_subgroup": {
                        "text": "Utwórz nową subgrupę"
                    },
                    "delete_group": {
                        "text": "Usuń grupę"
                    },
                    "delete_subgroup": {
                        "text": "Usuń subgrupę"
                    }
                },
                
                "messages": {
                    "duplicate_group": "Istnieje już grupa o tej samej nazwie",
                    "duplicate_subgroup": "Istnieje już podgrupa o tej samej nazwie"
                }
                
            },
            
            "rate": {
                "title": "Oceny",
                
                "help": {
                    "text": "<p>W tej sekcji możesz ocenić uczniów. Aby to zrobić, musisz wybrać projekt, rubrykę i uczniów, których chcesz ocenić. </p> <p> Oceny można przeprowadzić indywidualnie lub możesz ocenić całą grupę lub podgrupę, ale zmiany nie zostaną zapisane, dopóki nie ocenisz uczniów. </p> <p> Pamiętaj, że możesz zobaczyć wszystkie oceny wykonane w <a href='#students'>sekcji</a></p><p> wybierając projekt, rubrykę i uczniów do oceny, należy oznaczyć każde kryterium jako <em>bardzo dobrze</em>, <em> dobry </em>, <em> akceptowalny </em>lub<em>niedopuszczalne</em></p><p>Możliwe jest dołączenie dowodów na zapamiętanie Twojej oceny</p>"
                },
                
                "controls": {
                    "project": {
                        "label": "(1) Wybierz projekt"
                    },
                    "rubric": {
                        "label": "(2) Wybierz rubrykę"
                    },
                    "filter": {
                        "label": "(3) Wybierz uczniów, grupę lub subgrupę",
                        "optgroup": "Uczniowie"
                    },
                    "rate_action": {
                        "text": "Zapisz wyniki oceny"
                    },
                    "evidences": {
                        "label": "Załącz dowody które chcesz aby zostały zapamiętane"
                    }
                },
                
                "tooltips": {
                    "remove_selection": "Usuń wybrane elelmenty",
                    "evidences": "Załącz dodowy do tych kryteriów"
                },
                
                "messages": {
                    "success": "Ocena została zapisana",
                    "no_student": "W twoim bieżącym wyborze jest jakiś uczeń",
                    "no_ratings_to_save": "W bieżącym wyborze nie ma nic do zapisania"
                },
                
                "confirm": {
                    "leave_page": "Istnieją niezapisane oceny. Czy na pewno opuścisz tę stronę?"
                }
            },
            
            "students": {
                
                "title": "Uczniowie",
                
                "controls": {
                    "group": {
                        "label": "Grupa"
                    },
                    "progress": {
                        "text": "Zobacz postęp"
                    },
                    "edit": {
                        "text": "Edytuj"
                    }
                },
                
                "tables": {
                    "students": {
                        "fields": {
                            "photo": "Zdjęcie",
                            "name": "Nazwisko",
                            "identifier": "Email",
                            "groups": "Grupy",
                            "rubrics": "Rubryki"
                        }
                    }
                }
                
            },
            
            
            "student": {
                
                "title": "Uczeń",
                
                "controls": {
                    "name": {
                        "label": "Pełne imię i nazwisko",
                        "placeholder": "Imię i nazwisko. Np: John Doe"
                    },
                    "identifier": {
                        "label": "Email",
                        "placeholder": "Wpisz email ucznia"
                    },
                    "groups": {
                        "label": "Grupy"
                    },
                    "submit": {
                        "text": "Zaktualizuj"
                    },
                    "delete_student": {
                        "text": "Usuń tego ucznia"
                    }
                },
                
                "messages": {
                    "success": "Dane ucznia zostały zaktalizowane",
                    "delete": "Uczeń został usunięty z tej bazy danych"
                },
                
                "confirm": {
                    "delete": "Czy na pewno chcesz usunąć tego ucznia? Nie można cofnąć tej operacji"
                }
            },
            
            
            "progress": {
                "title": "Postęp ucznia",
                
                "controls": {
                    "project": {
                        "label": "Filtruj w projekcie"
                    },
                    "rubric": {
                        "label": "Filtruj w rubrykach"
                    },
                    "export": {
                        "text": "Eksportuj wyniki"
                    }
                },
                
                "messages": {
                    "no_student": "Nie mogę odnaleźć tego ucznia w bazie danych"
                }
            }
        }
    }
})
/**
 * i18N 
 *
 * @package EssenceTool
 */
define ({

    "root": {
        
        "vex": {
            "cancel": "Cancel"
        },
        
        "common": {
            
            "loading": {
                "title": "Essence<span>Tool</span>",
                "description": "We are preparing everyting. Please be patient&hellip;"
            },
            
            "message": {
                "controller_not_allowed": "You are not allowed to be here. Please authenticate yourself.",
                "controller_not_found": "Page not found"
            },
            
            "controls": {
               "select_all_groups": {
                   "text": "All groups"
               },
               "select": {
                   "placeholder": "Please, select an option"
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
                                "text": "<span class='icon-folder-open'></span> Projects"
                            },
                            "progress": {
                                "text": "<span class='icon-chart-pie'></span> Students"
                            },
                            "groups": {
                                 "text": "<span class='icon-users'></span> Groups",
                            },
                            "rate": {
                                "text": "<span class='icon-edit'></span> Rate"
                            },
                            "import_students": {
                                "text": "<span class='icon-right-big'></span> Import students"
                            },
                            "export": {
                                "text": "<span class='icon-left-big'></span> Export"
                            }
                        }
                    }
                }
            },
            
            "pages": {
                "import_students": {
                    
                    "title": "Import students",
                    
                    "help": {
                        "text": "<p>In this section you will be able to import a list of students and assign them automatically to a group. Notice that the students can only be included once, but they can belong to many groups. So, if you want to have the same students to many groups, import them again but selecting another group.</p><p>You can download a template to load your students <a href='assets/templates/students.csv' download>here</a></p>"
                    },
                    
                    "controls": {
                        "group": {
                            "label": "<strong>Step 1. </strong>Select the group or create a new one"
                        },
                        "file": {
                            "label": "<strong>Step 2. </strong>Submit a file with the students",
                            "placeholder": "Select a file"
                        },
                        "submit": {
                            "text": "Submit"
                        }
                    },
                    
                    "messages": {
                        "no_file": "You need to attach one valid .csv to import",
                        "success": "The file has been imported"
                    }
                },
                
                
                "export": {
                    
                    "title": "Export",
                    
                    "help": {
                        "text": "<p>In this section you can export your database in a file. Note that this file will include confidencial information about the students that can be protected according to the law. Please keep this information in a safe place and use it at your own risk. </p>"
                    },
                    
                    "controls": {
                        "submit": {
                            "text": "Export"
                        }
                    },
                    
                    "messages": {
                        "export_success": "The database han been exported"
                    }
                },
                
                
                "projects": {
                    "title": "Projects",
                    
                    "help": {
                        "text": "<p>In this section you can manage projects. A project is a handy way you can organise yourself. For example, a project can represent a course or an asignment</p>"
                    },
                    
                   "confirm": {
                        "delete_projects": "Are you sure do you want to delete these projects?. This action cannot be undone",
                    },
                    
                    "controls": {
                        "create_project": {
                            "text": "Create new project"
                        },
                        "delete_project": {
                            "text": "Delete selected projects"
                        }
                    },
                    
                },
                
                
                "groups": {
                    "title": "Groups",
                    
                    "help": {
                        "text": "<p>In this section you can manage groups. A group is a way about how you can organise the students in teams</p>"
                    },
                    
                   "confirm": {
                        "delete_groups": "Are you sure do you want to delete these groups?. This action cannot be undone",
                        "delete_subgroups": "Are you sure do you want to delete these subgroups?. This action cannot be undone",
                    },
                    
                    "prompt": {
                        "name_gruop": "Please, type the name of the group",
                        "name_subgruop": "Please, type the name of the new subgroup"
                    },
                    
                    "controls": {
                        "create_group": {
                            "text": "Create new group"
                        },
                        "create_subgroup": {
                            "text": "Create subgroup"
                        },
                        "delete_group": {
                            "text": "Delete selected groups"
                        },
                        "delete_subgroup": {
                            "text": "Delete selected subgroups"
                        }
                    },
                    
                    "messages": {
                        "duplicate_group": "There is already a group with the same name",
                        "duplicate_subgroup": "There is already a subgroup with the same name"
                    }
                    
                },
                
                "rate": {
                    "title": "Rate the students",
                    
                    "help": {
                        "text": "In this section, you can rate the students. To do it, you need to select also the rubric form and the project attached to it."
                    },
                    
                    "tooltips": {
                        "filter_by_group": {
                            "text": "Filter by group"
                        }
                    },
                    
                    "controls": {
                        "project": {
                            "label": "(1) Select a project"
                        },
                        "rubric": {
                            "label": "(2) Select the rubric"
                        },
                        "student": {
                            "label": "(3) Select the student to rate"
                        },
                       "group": {
                            "label": "Filter students by group"
                        },
                        
                        "rate_action": {
                            "text": "Save rate"
                        },
                    }
                    
                },
                
                "progress": {
                    
                    "title": "Student progress",
                    
                    "controls": {
                        "group": {
                            "label": "Group"
                        }
                    },
                    
                    "tables": {
                        "students": {
                            "fields": {
                                "photo": "Photo",
                                "name": "Name",
                                "email": "Email",
                                "groups": "Groups",
                                "rubrics": "Rubrics"
                            }
                        }
                    }
                    
                }
            }
        }
        
    }
}) ;
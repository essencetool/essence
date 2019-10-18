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
                "controller_not_found": "Page not found",
                "indexed_db_not_supported": "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
            },
            
            "controls": {
               "select_all_groups": {
                   "text": "All groups"
               },
               
               "select_all_projects": {
                    "text": "All projects"
               },
               
               "select_all_rubrics": {
                    "text": "All rubrics",
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
                            },
                            "assessment": {
                                "text": "<span class='icon-edit'></span> Assessment"
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
                        "success": "%success% of %total% students were successfully added to '%group%'"
                    }
                },
                
                "assessment": {
                    
                    "title": "Evaluation",
                    
                    "help": {
                        "text": "<p>This tool is suggested to repeat once/twice a year in order to see student´s development.</p>"
                    },
                    "controls": {
                        
                        "name": {
                            "label": "Please, introduce your name",
                            "placeholder": "Please, introduce your name"
                        },
                        
                        "email": {
                            "label": "Please, introduce your email",
                            "placeholder": "Please, introduce your email"
                        },
                        
                        "submit": {
                            "text": "Submit"
                        }
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
                    
                    "prompt": {
                        "name": "Please, enter the new name for this project",
                        "description": "Please, enter the new description for this project"
                    },
                    
                    "messages": {
                        "success": "The project has been updated",
                        "ratings_attached": "Can't delete this project. There is ratings attached",
                        "delete": "The project has been deleted"
                    },
                    
                    "controls": {
                        "create_project": {
                            "text": "&hellip; or create a new one"
                        },
                        "update_project": {
                            "text": "Update this project"
                        },
                        "delete_project": {
                            "text": "Delete selected projects"
                        },
                        "project": {
                            "label": "Search your project"
                        },
                        "name": {
                            "text": "Name",
                            "placeholder": "Please, enter the new of your project"
                        },
                        "description": {
                            "text": "Description",
                            "placeholder": "Please, write a short description about your project"
                        },
                        "submit": {
                            "text": "Submit"
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
                            "text": "Delete group"
                        },
                        "delete_subgroup": {
                            "text": "Delete subgroup"
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
                    },
                    
                    "messages": {
                        "success": "Done",
                        "no_student": "You must select a student",
                        "no_project": "You must select a project"
                    }
                },
                
                "students": {
                    
                    "title": "Students",
                    
                    "controls": {
                        "group": {
                            "label": "Group"
                        },
                        "progress": {
                            "text": "View progress"
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
                    
                },
                
                
                "progress": {
                    "title": "Progress of student",
                    
                    "controls": {
                        "project": {
                            "label": "Filter by project"
                        },
                        "rubric": {
                            "label": "Filter by rubric"
                        },
                        "export": {
                            "text": "Export results"
                        }
                    },
                    
                    "messages": {
                        "no_student": "Can't find this student in the database",
                    }
                }
                
            }
        }
        
    }
}) ;
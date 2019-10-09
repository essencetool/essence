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
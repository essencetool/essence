/**
 * ProjectsController
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/projects.html',
    'text!templatePath/templates/projects-row.html',
    'jquery', 
    'hogan',
    'config', 
    'db',
    'i18n!nls/translations'
], function (tpl, tpl_projects_row, $, hogan, config, db, i18n) {

    /** @var wrapper DOM zero element */
    var wrapper;
    

    /**
     * index
     *
     * Entry point of the map perspective
     *
     * @package EssenceTool
     */
    var index = function (params) {
    
        // Get wrapper
        wrapper = $('#wrapper');
        
        
        /** @var template TPL */
        var template = hogan.compile (tpl);
        
        
        /** @var template_project_row TPL */
        var template_project_row = hogan.compile (tpl_projects_row);
        
        
        /** @var template_params Object */
        var template_params = {};
        template_params['i18n'] = function () {
            return function (text, render) {
                return ref (i18n, text);
            }
        };
        
        
        // Render
        wrapper.html (template.render (template_params));
        
        
        /** @var table DOM */
        var table = wrapper.find ('.projects-table-placeholder');
        
        
        // Populate projects
        db.getAll ('projects').then (function (projects) {
            $.each (projects, function (index, project) {
                table.append (template_project_row.render (project));
            });
        });
        
        
        // Bind actions
        table.on ('change', 'input[type="checkbox"]', function () {
            wrapper.find ('.delete-project-action')
                .prop ('disabled', ! table.find ('input[type="checkbox"]:checked').length)
            ;
        });
        
        
        // Bind modify parameters
        table.on ('click', '.modify-name-action, .modify-description-action', function () {
            
            /** @var id int */
            var id = $(this).attr ('data-id') * 1;
            
            
            /** @var key String */
            var key = $(this).is ('.modify-name-action') ? 'name' : 'description';
            
            
            // Get project
            db.getByID ('projects', id).then (function (project) {
                
                if ( ! project) {
                    return;
                }
                
                vex.dialog.prompt ({
                    message: "Please, type the new " + key,
                    value: project[key],
                    callback: function (value) {
                        
                        if ( ! value) {
                            return;
                        }
                        
                        
                        /** @var project Object */
                        project[key] = value;
                        
                        
                        // Add to the database
                        db.put ('projects', project);
                        
                        
                        // Repopulate
                        index (params);
                        
                    }
                });
            });
        });
        

        
        
        // Create new project
        wrapper.find ('.create-project-action').click (function (e) {

            vex.dialog.prompt ({
                message: "Please, type the name of the new project",
                callback: function (name) {
                    
                    if ( ! name) {
                        return;
                    }
                    
                    
                    /** @var project Object */
                    var project = {
                        name: name
                    }
                    
                    
                    // Add to the database
                    db.add ('projects', project);
                    
                    
                    // Repopulate
                    index (params);
                    
                    
                }
            });
        });
        
        
        // Delete selected projects
        wrapper.find ('.delete-project-action').click (function (e) {

            vex.dialog.confirm ({
                message: i18n.frontend.pages.projects.confirm.delete_projects,
                callback: function (confirm) {
                    
                    if ( ! confirm) {
                        return;
                    }
                    
                    vex.dialog.alert ('@todo');
                }
            });
        });
        
        
        // Remove loading state
        $('body').removeClass ('loading-state');
        
    }
    
    
    // Return public API
    return {
        index: index
    }
}) ;
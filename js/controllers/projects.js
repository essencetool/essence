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
    'helpers',
    'i18n!nls/translations'
], function (tpl, tpl_projects_row, $, hogan, config, db, helpers, i18n) {

    /**
     * index
     *
     * Entry point of the map perspective
     *
     * @package EssenceTool
     */
    var index = function (params) {
        
        /** @var project_id int */
        var project_id = params[1] * 1;
        
           
        /** @var wrapper DOM zero element */
        var wrapper = $('#wrapper');
        
        
        /** @var template TPL */
        var template = hogan.compile (tpl);
        
        
        /** @var template_project_row TPL */
        var template_project_row = hogan.compile (tpl_projects_row);
        
        
        /** @var template_params Object */
        var template_params = helpers.i18n_tpl ({
            show_create_button: project_id ? true : false,
            show_delete_button: project_id ? true : false
        });
        
        console.log (template_params);
        
        
        // Render
        wrapper.html (template.render (template_params));
        
        
        /** @var select_project */
        var select_project = wrapper.find ('[name="project"]');
        
        
        // Populate
        helpers.populate_select (select_project, 'projects', project_id);
        
        
        // Bind select group 
        select_project.on ('select2:select', function (e) {
            window.location.hash = 'projects' + '/' + select_project.val ();
        });
        
        
        /** @var table DOM */
        var table = wrapper.find ('.projects-table-placeholder');
        
        
        /** @var form DOM */
        var form = wrapper.find ('[name="project-form"]');
        
        
        // Get all available projects
        db.getByID ('projects', project_id).then (function (project) {
            
            /** @var template_params Object */
            var template_params = helpers.i18n_tpl (project);
                
                
            // Append a new item
            table.append (template_project_row.render (template_params));
            
        });
        
        
        // Handle submit form
        form.submit (function (e) {
            
            // Prevent default action
            e.preventDefault ();
            
            
            /** @var id int */
            var id = form.find ('[name="id"]').val () * 1;
            
            
            /** @var name String */
            var name = $.trim (form.find ('[name="name"]').val ());
            
            
            /** @var description String */
            var description = $.trim (form.find ('[name="description"]').val ());
            
            
            // No name is selected. Just for security reasons. The field is 
            // validated using the required and regex pattern
            // @see https://stackoverflow.com/questions/13766015/is-it-possible-to-configure-a-required-field-to-ignore-white-space
            if ( ! name) {
                return;
            }
            
            
            /** @var project Object */
            var project = {
                name: name,
                description: description
            };
            
            
            // Id is attached only if we are modifying the project
            if (id) {
                project.id = id;
            }

            
            // Update item (or create a new one)
            db.updateItem ('projects', project).then (function () {
                vex.dialog.alert ({
                    message: i18n.frontend.pages.projects.messages.success,
                    callback: function () {
                        index (['projects', project_id]);
                    }
                });
            });
        });

        
        // Delete selected projects
        wrapper.find ('.delete-project-action').click (function (e) {
            
            // Ensure that there are no ratings attached to this project
            db.getAllByKey ('ratings', 'project_id', project_id).then (function (ratings) {
                
                // There are ratings attached
                if (ratings) {
                    vex.dialog.alert (i18n.frontend.pages.projects.messages.ratings_attached);
                    return;
                }
                
                
                // Request user confirmation
                vex.dialog.confirm ({
                    message: i18n.frontend.pages.projects.confirm.delete_projects,
                    callback: function (confirm) {
                    
                        // The user has cancelled the operation
                        if ( ! confirm) {
                            return;
                        }
                    
                    
                       // Reload
                        db.deleteItems ('projects', project_id).then (function () {
                            
                            vex.dialog.alert ({
                                message: i18n.frontend.pages.projects.messages.delete,
                                callback: function () {
                                    window.location.hash = 'projects';
                                }
                            });
                            
                        }).catch (function (e) {
                            console.log (e);
                        });
                    }
                });
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
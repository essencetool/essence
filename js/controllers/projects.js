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
        
        
        /** @var template_params Object */
        var template_params = {};
        template_params['i18n'] = function () {
            return function (text, render) {
                return ref (i18n, text);
            }
        };
        
        
        // Render
        wrapper.html (template.render (template_params));
        
        
        // Populate projects
        db.getAll ('projects', function (projects) {
            
            /** @var table DOM */
            var table = wrapper.find ('.projects-table-placeholder');
            
            
            /** @var template_project_row TPL */
            var template_project_row = hogan.compile (tpl_projects_row);
            
            
            // Iterate over the groups
            $.each (projects, function (index, project) {
                table.append (template_project_row.render (project));
            });
            
        });
        
        
        // Bind actions
        wrapper.find ('.create-rubric-action').click (function (e) {

            vex.dialog.prompt ({
                message: "Please, type the name of the new project",
                callback: function (name) {
                    
                    if ( ! name) {
                        return;
                    }
                    
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
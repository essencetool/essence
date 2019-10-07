/**
 * ProjectsController
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/projects.html',
    'jquery', 
    'hogan',
    'config', 
    'i18n!nls/translations',
    'json!assetsPath/projects.json'
], function (tpl, $, hogan, config, i18n, projects) {

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
        
        
        // Send data to the template
        template_params['projects'] = projects;
        
        
        
        // Render
        wrapper.html (template.render (template_params));
        
        
        // Render
        wrapper.find ('select').select2 ();
        
        
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
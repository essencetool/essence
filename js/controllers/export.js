/**
 * Export Controller
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/export.html',
    'jquery', 
    'hogan',
    'config', 
    'db', 
    'i18n!nls/translations',
    'jquery-csv'
], function (tpl, $, hogan, config, db, i18n) {

    /**
     * index
     *
     * Entry point of the map perspective
     *
     * @package EssenceTool
     */
    var index = function (params) {
    
        /** @var wrapper DOM zero element */
        var wrapper = $('#wrapper');
        
        
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
        
        
        
        /** @var form DOM */
        var form = wrapper.find ('form[name="export-form"]');
        
        
        // Bind submit form
        form.unbind ().submit (function () {
            
            /** @var response */
            var response = {};
            
            
            // Get all items from the database
            db.getAllItems ().then (function (response) {
                
                /** @var database String */
                var database = JSON.stringify (response, null, 2);
                
                var element = document.createElement ('a');
                element.setAttribute ('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent (database));
                element.setAttribute ('download', 'essence-' + new Date ().getTime () + '.json');
                element.style.display = 'none';
                document.body.appendChild (element);
                element.click ();

                document.body.removeChild(element);
                
                
                // Notify the user
                vex.dialog.alert (i18n.frontend.pages.export.messages.export_success);
                
            });
            
            
            // prevent
            return false; 
        });
        
        
        // Remove loading state
        $('body').removeClass ('loading-state');        
        
    }
    
    
    // Return public API
    return {
        index: index
    }
}) ;
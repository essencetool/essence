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
    'helpers',
    'i18n!nls/translations',
    'jquery-csv'
], function (tpl, $, hogan, config, db, helpers, i18n) {

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
        var template_params = helpers.i18n_tpl ();
        
        
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
                
                /** @var filename String */
                var filename = 'essence-' + new Date ().getTime () + '.json';
                
                
                /** @var database String */
                var database = JSON.stringify (response, null, 2);
                
                
                // Download
                helpers.download_file (filename, database);
                
                
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
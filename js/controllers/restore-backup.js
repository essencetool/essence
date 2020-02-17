/**
 * Restore backup
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/restore-backup.html',
    'jquery', 
    'hogan',
    'config', 
    'db',
    'helpers',
    'i18n!nls/translations'
    
], function (tpl, $, hogan, config, db, helpers, i18n) {

    /**
     * index
     *
     * Allows to import students in the essence tool
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
        
        
        // Populate groups
        helpers.populate_select_group (wrapper.find ('[name="group"]'));
        
        
        /** @var form */
        var form = wrapper.find ('[name="restore-backup-form"');
        
        
        /** @var file_field */
        var file_field = form.find ('[name="file"]');
        
        
        
        // Upload file
        form.find ('[name="file"]').on ('change', function (e) {
            
            // Check event validity
            if ( ! e || ! e.target || ! e.target.files || e.target.files.length === 0) {
                return;
            }
            
            
        });
        
        
        // Handle submit
        form.submit (function (e) {
            
            // Prevent default action
            e.preventDefault ();
            
            
            /** @var fileReader */
            var fileReader = new FileReader ();
            
            
            // Set callback
            fileReader.onload = function () {
                
                /** @var backup */
                var backup = JSON.parse (fileReader.result);
                
                
                // Truncate database
                db.truncate ().then (function () {
                    
                    // Restore backup
                    db.restore_backup (backup).then (function () {
                        vex.dialog.alert (i18n.frontend.pages.restore_backup.messages.success);
                    });
                });
            };
            
            
            // Read file as text
            fileReader.readAsText (file_field.prop ('files')[0]);
            
        });
        
        
        // Remove loading state
        $('body').removeClass ('loading-state');
        
    }
    
    
    // Return public API
    return {
        index: index
    }
}) ;
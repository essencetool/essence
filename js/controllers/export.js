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
    'i18n!nls/translations',
    'json!assetsPath/students.json',
    'json!assetsPath/groups.json'
], function (tpl, $, hogan, config, i18n, students, groups) {

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
        
        
        // Send data to the template
        template_params['students'] = students;
        template_params['groups'] = groups;

        
        
        // Render
        wrapper.html (template.render (template_params));
        
        
        /** @var form DOM */
        var form = wrapper.find ('form');
        
        
        // Bind submit form
        form.unbind ().submit (function () {
            
            /** @var group int */
            var group = form.find ('[name="group"]').val () * 1;
            
            
            /** @var all_ratings Object */
            var all_ratings = localStorage.getItem ('ratings');
            if ( ! all_ratings) {
                all_ratings = {};
            } else {
                all_ratings = JSON.parse (all_ratings);
            }
            
            console.log (all_ratings);
            
            var csv = "data:text/csv;charset=utf-8,";
            Object.keys (all_ratings).map (function (key, item) {
                console.log (all_ratings[key]);
                csv = csv + "\n";
            });
            
            
            console.log (csv);
            
            
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
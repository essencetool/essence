/**
 * Progress Controller
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/progress.html',
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
        
        
        // Render
        wrapper.find ('select').select2 ();
        
        
        // Remove loading state
        $('body').removeClass ('loading-state');        
        
    }
    
    
    // Return public API
    return {
        index: index
    }
}) ;
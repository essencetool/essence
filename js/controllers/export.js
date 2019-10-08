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
    'json!assetsPath/students.json',
], function (tpl, $, hogan, config, db, i18n, students) {

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
        
        
        // Render
        wrapper.html (template.render (template_params));
        
        
        // Populate groups
        db.getAll ('groups', function (groups) {
            
            /** @var select DOM */
            var select = wrapper.find ('[name="group"]');
            
            
            // Iterate over the groups
            $.each (groups, function (index, group) {
                
                // Append the optgroup
                select.append ($("<optgroup />").attr ('label', group.name));
                
                
                // Iterate over the subgruoups
                $.each (group.subgroups, function (index_subgroup, subgroup) {
                    select
                        .find ('optgroup:last-child')
                            .append ($("<option />")
                                .attr ('value', subgroup.id)
                                .text (subgroup.name)
                            );
                });
                
            });
            
            
            // Render select2 field
            select.prop ('disabled', false).select2 ();
            
        });
        
        
        
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
            
            
            var csv = "data:text/csv;charset=utf-8,";
            Object.keys (all_ratings).map (function (key, item) {
                console.log (all_ratings[key]);
                csv = csv + "\n";
            });
            
            
            vex.dialog.alert ('@todo');
            
            
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
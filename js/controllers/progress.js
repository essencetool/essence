/**
 * Progress Controller
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/progress.html',
    'text!templatePath/templates/progress-student-row.html',
    'jquery', 
    'hogan',
    'config',
    'db',
    'i18n!nls/translations',
    'json!assetsPath/students.json'
], function (tpl, tpl_student_row, $, hogan, config, db, i18n, students) {

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
        
        
        // Populate students
        db.getAll ('students', function (students) {
            
            /** @var table DOM */
            var table = wrapper.find ('.students-table-placeholder');
            
            
            /** @var template_student_row TPL */
            var template_student_row = hogan.compile (tpl_student_row);
            
            
            // Iterate over the groups
            $.each (students, function (index, student) {
                table.append (template_student_row.render (student));
            });
            
            
            // Render select2 field
            select.prop ('disabled', false).select2 ();
            
        });
        
        
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
        
        
        
        
        // Remove loading state
        $('body').removeClass ('loading-state');        
        
    }
    
    
    // Return public API
    return {
        index: index
    }
}) ;
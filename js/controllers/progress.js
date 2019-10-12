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
        
        /** @var group_id int */
        var group_id = params[1];
        
    
        /** @var wrapper DOM zero element */
        var wrapper = $('#wrapper');
        
        
        /** @var template TPL */
        var template = hogan.compile (tpl);
        
        
        /** @var template_student_row TPL */
        var template_student_row = hogan.compile (tpl_student_row);
        
        
        /** @var template_params Object */
        var template_params = {};
        template_params['i18n'] = function () {
            return function (text, render) {
                return ref (i18n, text);
            }
        };
        
        
        // Render
        wrapper.html (template.render (template_params));
        
        
        /** @var table DOM */
        var table = wrapper.find ('.students-table-placeholder');
        
        
        // Populate students
        db.getAllStudents ().then (function (students) {
            
            // Get each student
            $.each (students, function (index, student) {

                if (group_id && student.groups.indexOf (group_id) == -1) {
                    return true;
                }
            
                table.append (template_student_row.render (student));
            });
        });
        
        
        /** @var select_group DOM */
        var select_group = wrapper.find ('[name="group"]');
        
        
        // Render select2 field
        select_group.prop ('disabled', false).select2 ();
        
        
        // Populate groups
        db.getAllGroups ().then (function (groups) {
            
            $.each (groups, function (index, group) {
            
                // Append the optgroup
                select_group.append ($("<optgroup />").attr ('label', group.name));
                
                
                // Iterate over the subgruoups
                $.each (group.subgroups, function (index_subgroup, subgroup) {
                    
                    // Get project
                    if (group_id && subgroup.id == group_id) {
                        
                        // Mark as selected
                        subgroup.is_selected = true;
                        
                        
                        // Update the caption of the table
                        wrapper.find ('.group-name-ph').html (subgroup.name);
                        
                    }
                
                
                    // Attach to the optgroup
                    select_group
                        .find ('optgroup:last-child')
                            .append ($("<option />")
                                .attr ('value', subgroup.id)
                                .prop ('selected', subgroup.is_selected)
                                .text (subgroup.name)
                            );
                });
            });
            
            select_group.prop ('disabled', false).select2 ();

        });
            
        
        
        // Bind select group 
        select_group.on ('select2:select', function (e) {
            window.location.hash = 'check' + '/' + select_group.val ();
        });


        
        
        // Remove loading state
        $('body').removeClass ('loading-state');        
        
    }
    
    
    // Return public API
    return {
        index: index
    }
}) ;
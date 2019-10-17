/**
 * Students Controller
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/students.html',
    'text!templatePath/templates/students-student-row.html',
    'jquery', 
    'hogan',
    'config',
    'db',
    'helpers',
    'i18n!nls/translations'
], function (tpl, tpl_student_row, $, hogan, config, db, helpers, i18n) {

    /**
     * index
     *
     * Entry point of the map perspective
     *
     * @package EssenceTool
     */
    var index = function (params) {
        
        /** @var group_id int */
        var group_id = params[1] * 1;
        
    
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
                
                // Filter
                if (group_id && student.groups.indexOf (group_id) === -1) {
                    return true;
                }
                
                
                /** @var template_params Object */
                var template_params = helpers.i18n_tpl (student);
                
                
                // Append
                table.append (template_student_row.render (template_params));
                
            });
        });
        
        
        /** @var select_group DOM */
        var select_group = wrapper.find ('[name="group"]');
        
        
        // Populate groups
        helpers.populate_select_group (select_group, group_id);

        
        // Bind select group 
        select_group.on ('select2:select', function (e) {
            window.location.hash = 'students' + '/' + select_group.val ();
        });
        
        
        // Remove loading state
        $('body').removeClass ('loading-state');        
        
    }
    
    
    // Return public API
    return {
        index: index
    }
}) ;
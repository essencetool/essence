/**
 * ImportStudents Controller
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/import-students.html',
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
        
        
        // Populate groups
        db.getAllGroups ().then (function (groups) {
            
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
        
        
        // Handle form
        var form = wrapper.find ('[name="import-students-form"');
        
        
        // Upload file
        form.find ('[name="file"]').on ('change', function () {
            
            /** @var fileReader */
            var fileReader = new FileReader ();
            fileReader.onload = function () {
                form.find ('[name="students"]').val (fileReader.result);
            };
            fileReader.readAsText (form.find ('[name="file"]').prop ('files')[0]);
        });
        
        
        // Handle submit
        form.submit (function (e) {
            
            /** @var group_id int */
            var group_id = form.find ('[name="group"]').val ();
            
            
            /** @var students Array */
            var students = form.find ('[name="students"]').val ();
            
            
            // Check the validity of the students
            if ( ! students) {
                vex.dialog.alert (i18n.frontend.pages.import_students.messages.no_file);
                return false;
            }
            
            
            // Transform to an array
            students = $.csv.toArrays (students);
            
            
            
            // For each student... 
            $.each (students, function (index, student) {
                
                // Avoid title
                if ( ! index) {
                    return true;
                }
                
                
                // Attach student
                db.add ('students', {
                    name: student[0],
                    email: student[1],
                    groups: [group_id],
                }, {
                    key: 'email',
                    callback: function (student) {
                        
                        // Attach the new group
                        student.groups.push (group_id);
                        
                        
                        // Return the student
                        return student;
                    }
                });
            });
            
            
            // Notify the user
            vex.dialog.alert (i18n.frontend.pages.import_students.messages.success);
            
            
            // Reset the form
            form.trigger ("reset");
            form.find ('[name="students"]').val ('');
            
            
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
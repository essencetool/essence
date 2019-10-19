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
        
        
        // Populate groups
        helpers.populate_select_group (wrapper.find ('[name="group"]'));
        
        
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
            
            // Prevent default action
            e.preventDefault ();
            
            
            /** @var group_id int The group to store the students */
            var group_id = form.find ('[name="group"]').val () * 1;
            
            
            /** @var students_csv Array Get the result for the file */
            var students_csv = form.find ('[name="students"]').val ();
            
            
            /** @var re RegExp To check the validity of the emails */
            var re = /\S+@\S+\.\S+/;
            
            
            /** @var students Array Store the students to insert */
            var students = [];
            
            
            /** 
             * on_complete_callback
             *
             * This function will be called when all the students were 
             * imported
             */
            var on_complete_callback = function (total_lines, total_imported) {
                
                /** @var messate String */
                var message = helpers.interpolate (
                    i18n.frontend.pages.import_students.messages.success, {
                        '%success%': total_imported,
                        '%total%': total_lines,
                        '%group%': form.find ('[name="group"]').select2 ('data')[0].text
                    }
                );
                
                
                // Notify the user
                vex.dialog.alert ({
                    message: message,
                    callback: function () {
                        window.location.hash = 'students/' + group_id;
                    }
                    
                });
            }
            
            
            // Check the validity of the students
            if ( ! students_csv) {
                vex.dialog.alert (i18n.frontend.pages.import_students.messages.no_file);
                return false;
            }
            
            
            // Transform to an array
            students_csv = $.csv.toArrays (students_csv);
            
            
            /** @var total_lines int */
            var total_lines = students_csv.length - 1;
            
            
            /** @var total_imported int */
            var total_imported = 0;
            
            
            // For each student... 
            $.each (students_csv, function (index, student_raw) {
                
                // Avoid line 1 with the headers
                if ( ! index) {
                    return true;
                }
                
                
                /** @var name String The name is in the first column */
                var name = student_raw[0];
                
                
                /** @var email String The email is in the second column */
                var email = student_raw[1];
                
                
                // Validation. Students must have a valid email and name
                // If not, skip to the next line
                if ( ! (name && email && re.test (email))) {
                    return true;
                }
                
                
                // Create the student and attach to students array
                students.push ({
                    name: name,
                    email: email,
                    groups: [group_id],
                });
            });
            
            
            // Update successful 
            total_imported = students.length;
            
            
            // In case we successfully create students, store them
            // in the database
            if (students.length) db.addItems ('students', students, 'email').then (function (duplicate_students) {
                    
                // Update the already existent students by including the 
                // new group
                $.each (duplicate_students, function (index, student) {
                    if (student.groups.indexOf (group_id) === -1) {
                        student.groups.push (group_id);
                    }
                });
                
                
                // Update group
                if (duplicate_students.length) {
                    db.updateItems ('students', duplicate_students).then (function () {
                        on_complete_callback (total_lines, total_imported);
                    });
                } else {
                    on_complete_callback (total_lines, total_imported);
                }
                
            }).catch (function (e) {
                console.log (e);
            });
        });
        
        
        // Remove loading state
        $('body').removeClass ('loading-state');
        
    }
    
    
    // Return public API
    return {
        index: index
    }
}) ;
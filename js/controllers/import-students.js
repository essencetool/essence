/**
 * Import Students Controller
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
    'xlsx',
    'jquery-csv',
    
], function (tpl, $, hogan, config, db, helpers, i18n, xlsx) {

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
        var form = wrapper.find ('[name="import-students-form"');
        
        
        /** @var file_field */
        var file_field = form.find ('[name="file"]');
        
        
        /** @var students_field */
        var students_field = form.find ('[name="students"]');
        
        
        /** @var group_field */
        var group_field = form.find ('[name="group"]');
        
        
        
        // Upload file
        form.find ('[name="file"]').on ('change', function (e) {
            
            // Check event validity
            if ( ! e || ! e.target || ! e.target.files || e.target.files.length === 0) {
                return;
            }
            
            
            /** @const name */
            const name = event.target.files[0].name;
            
            
            /** @const ext */
            const ext = name.substring (name.lastIndexOf ('.') + 1);
            
            
            /** @var fileReader */
            var fileReader = new FileReader ();
            
            
            // Display name on the screen
            form.find ('.form-file-ph').html (name);
            
            
            // Read
            switch (ext) {
                case 'csv':
                
                    // Set callback
                    fileReader.onload = function () {
                        students_field.val (fileReader.result);
                    };
                    
                    
                    // Read file as text
                    fileReader.readAsText (file_field.prop ('files')[0]);
                    break;
                    
                case 'xls':
                case 'xlsx':
                
                    // Set callback
                    // @link https://github.com/SheetJS/sheetjs/wiki/Reading-XLSX-from-FileReader.readAsArrayBuffer()
                    fileReader.onload = function (e) {
                        
                        /** @var binary String */
                        var binary = '';
                        
                        
                        /** @var bytes Array */
                        var bytes = new Uint8Array (e.target.result);
                        
                        
                        /** @var length int */
                        var length = bytes.byteLength;
                        
                        
                        // Get binary representation
                        for (var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        
                        
                        /** @var wb XLSX */
                        var wb = XLSX.read (binary, {type: 'binary', cellDates:true, cellStyles:true});
                        
                        
                        /** @var sheet Sheet */
                        var sheet = wb.Sheets[wb.SheetNames[0]];
                        
                        
                        /** @var csv String */
                        var csv = XLSX.utils.sheet_to_csv (sheet);
                        
                        
                        // Render
                        students_field.val (csv);

                    };
                    
                    fileReader.readAsArrayBuffer (file_field.prop ('files')[0]);


                    
                    console.log ("@todo");
                    break;
            }
            
            
        });
        
        
        // Handle submit
        form.submit (function (e) {
            
            // Prevent default action
            e.preventDefault ();
            
            
            /** @var group_id int The group to store the students */
            var group_id = group_field.val () * 1;
            
            
            /** @var students_csv Array Get the result for the file */
            var students_csv = students_field.val ();
            
            
            /** @var students Array Store the students to insert */
            var students = [];
            
            
            /** 
             * on_complete_callback
             *
             * @param success int
             * @param total int
             *
             * This function will be called when all the students were 
             * imported
             */
            var on_complete_callback = function (success, total) {
                
                /** @var messate String */
                var message = helpers.interpolate (
                    i18n.frontend.pages.import_students.messages.success, {
                        '%success%': success,
                        '%total%': total,
                        '%group%': group_field.select2 ('data')[0].text
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
            var total_lines = 0;
            
            
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
                
                
                /** @var identifier String The identifier is in the second column */
                var identifier = student_raw[1];
                
                
                // Validation. Students must have a valid identifier and name
                // If not, skip to the next line
                if ( ! (name && identifier)) {
                    return true;
                }
                
                
                // Update total lines
                total_lines++;
                
                
                // Create the student and attach to students array
                students.push ({
                    name: name,
                    identifier: identifier,
                    groups: [group_id],
                });
            });
            
            
            console.log (students);
            
            
            // Update successful 
            total_imported = students.length;
            
            
            // In case we successfully create students, store them
            // in the database
            if (students.length) db.addItems ('students', students, 'identifier').then (function (duplicate_students) {
                    
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
                        on_complete_callback (total_imported, total_lines);
                    });
                } else {
                    on_complete_callback (total_imported, total_lines);
                }
                
            // Register error
            }).catch (function (e) {
                console.log ('on update students');
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
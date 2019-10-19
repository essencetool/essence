/**
 * Student Controller
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/student.html',
    'jquery', 
    'hogan',
    'config',
    'db',
    'helpers',
    'i18n!nls/translations',
    'chartjs',
    'jquery-csv'
], function (tpl, $, hogan, config, db, helpers, i18n, chartjs) {

    /** @var student_id int */
    var student_id;
        
        
    /**
     * index
     *
     * Entry point
     *
     * @package EssenceTool
     */
    var index = function (params) {
        
        // Resolve paramters
        student_id = params[1] * 1;
        
        
        // Retrieve information about the student
        db.getStudentById (student_id).then (function (student) {
            render (student);
        }).catch (function (e) {
            vex.dialog.alert ({
                message: i18n.frontend.pages.progress.messages.no_student,
                callback: function () {
                    window.location.hash = '';
                }
            });
        });
    }
    
    
    /**
     * render
     *
     * @param student Object
     */
    
    var render = function (student) {
    
        /** @var wrapper DOM zero element */
        var wrapper = $('#wrapper');
        
        
        /** @var template TPL */
        var template = hogan.compile (tpl);
        
        
        /** @var template_params Object */
        var template_params = helpers.i18n_tpl ();
        template_params['student'] = student;
        
        
        // Render
        wrapper.html (template.render (template_params));
        
        
        /** @var form jQuery */
        var form = wrapper.find ('[name="student-form"]');
        
        
        // Populate groups
        helpers.populate_select_group (wrapper.find ('[name="group"]'), student.groups);
        
        
        // Submit form
        form.submit (function (e) {
            
            // Prevent default
            e.preventDefault ();
            
            
            // Modify the student according to the form
            student.name = form.find ('[name="name"]').val ();
            student.email = form.find ('[name="email"]').val ();
            student.groups = form.find ('[name="group"]').val ().map (Number);
            
            
            // Update student in the database
            db.updateItem ('students', student).then (function () {
                vex.dialog.alert (i18n.frontend.pages.student.messages.success);
            }).catch (function (e) {
                console.log (e);
            });
        });
        
        
        // Delete student
        form.find ('.delete-student-action').click (function (e) {
            
            // Request user confirmation
            vex.dialog.confirm ({
                message: i18n.frontend.pages.student.confirm.delete,
                callback: function (confirm) {
                
                    // The user has cancelled the operation
                    if ( ! confirm) {
                        return;
                    }
                
                
                   // Reload
                    db.deleteItems ('students', student.id).then (function () {
                        
                        // @todo Delete ratings from this student
                        db.getAllByKey ('ratings', 'student_id', student.id).then (function (ratings) {
                            
                            // Delete all ratings, if any...
                            db.deleteItems ('ratings', pluck (ratings, 'id'));
                            
                            
                            // Notify user
                            vex.dialog.alert ({
                                message: i18n.frontend.pages.student.messages.delete,
                                callback: function () {
                                    window.location.hash = 'students';
                                }
                            });
                        });
                        
                    }).catch (function (e) {
                        console.log (e);
                    });
                }
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
/**
 * RateController
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/rate.html',
    'text!templatePath/templates/rubric-form.html',
    'text!templatePath/templates/student-box.html',
    'jquery', 
    'hogan',
    'config', 
    'db',
    'helpers',
    'i18n!nls/translations'
], function (tpl, tpl_rubric_form, tpl_student_box, $, hogan, config, db, helpers, i18n) {

    /** @var wrapper DOM zero element */
    var wrapper;
    

    /**
     * index
     *
     * Entry point of the map perspective
     *
     * @package EssenceTool
     */
    var index = function (params) {
    
        // Get wrapper
        wrapper = $('#wrapper');
        
        
        // Render templates
        var template = hogan.compile (tpl);
        var template_student_profile = hogan.compile (tpl_student_box);
        var template_rubric_form = hogan.compile (tpl_rubric_form);
        
        
        /** @var rubric_id int */
        var rubric_id = params[1] * 1;
        
        
        /** @var student_id int */
        var student_id = params[2] * 1;
        
        
        /** @var project_id int */
        var project_id = params[3] * 1;
        
        
        /** @var group_id int  */
        var group_id = params[4] * 1;
        
        
        /** @var template_params Object */
        var template_params = {};
        template_params['i18n'] = function () {
            return function (text, render) {
                return ref (i18n, text);
            }
        };
        
        
        // Send data to the template
        wrapper.html (template.render (template_params));
        
        
        // Get elements
        var rate_form = wrapper.find ('form');
        
        
        // Populate projects
        helpers.populate_select (wrapper.find ('[name="project"]'), 'projects', project_id);
        helpers.populate_select (wrapper.find ('[name="rubric"]'), 'rubrics', rubric_id);
        helpers.populate_select (wrapper.find ('[name="student"]'), 'students', student_id);
        helpers.populate_select_group (wrapper.find ('[name="group"]'), group_id);
        
        
        // Render the rubric if available
        if (rubric_id) db.getByID ('rubrics', rubric_id).then (function (rubric) {

            // Update form
            wrapper
                .find ('[name="rubric_id"]')
                    .val (rubric.id)
                    .end ()
            
            
            // Render the rubric form
            rate_form.find ('.rubric-form-placeholder').html (template_rubric_form.render (rubric));
            
            
            // Render the student ID
            wrapper.find ('[name="student_id"]').val (student_id);
            
            
            // Attach evidence
            wrapper.find ('.attach-evidence-action').unbind ().click (function (e) {
                $(this).closest ('tr').next ().toggleClass ('has-evidence');
            });
            
            
            // Bind remove selection
            wrapper.find ('.remove-selection-action').unbind ().click (function (e) {
                $(e.target).closest ('tr').find ('[type="radio"]').prop ('checked',false);
            });
            
            
            // Nothing to do if we didn't have selected the project nor the student
            if ( ! (project_id && student_id)) {
                return;
            }
            
            
            // Update the rubric form with current rating
            db.getRatingById ([project_id, rubric_id, student_id]).then (function (rating) {
                
                // No rating was found
                if ( ! rating) {
                    return;
                }
                
                // Update rubric information with the last score of the user
                $.each (rating.values, function (key, info) {
                
                    // Update evidence
                    rate_form
                        .find ('[name="' + key + '"][value="' + info.value + '"]')
                            .prop ('checked', true)
                            .end ()
                        .find ('[name="' + key + '-evidences"]')
                            .val (info.evidence)

                });
            });
        });
        
        
        // If we have an student selected, when can print their information
        // on the screen
        if (student_id) db.getStudentById (student_id, function (student) {
            
            if (group_id && student.group_id.indexOf (group_id) == -1) {
                window.location.hash = 
                    'rate'
                    + '/' + wrapper.find ('[name="rubric"]').val () 
                    + '/' + wrapper.find ('[name="student"]').val () 
                    + '/' + wrapper.find ('[name="project"]').val () 
                    + '/' + wrapper.find ('[name="group"]').val ()
                ;
                return;

            }
            
            
            // Render the student profile
            wrapper.find ('.student-profile-placeholder').html (template_student_profile.render (student));
           
        });
  
        
        // Bind change form
        wrapper.find ('[name="rubric"], [name="student"], [name="group"], [name="project"]').on ('select2:select', function (e) {
            window.location.hash = 
                'rate'
                + '/' + wrapper.find ('[name="rubric"]').val () 
                + '/' + wrapper.find ('[name="student"]').val () 
                + '/' + wrapper.find ('[name="project"]').val ()
                + '/' + wrapper.find ('[name="group"]').val ();
        });
        
        
        // Submit rating
        rate_form.submit (function (e) {
            
            /** @var rating Object */
            var rating = {
                'created': new Date (),
                'student_id': student_id,
                'project_id': project_id,
                'rubric_id': rubric_id,
                'values': {}
            };
            
            
            // Validate
            if ( ! rating.project_id) {
                vex.dialog.alert (i18n.frontend.pages.rate.messages.no_project);
                return false;
            }
            
            
            if ( ! rating.student_id) {
                vex.dialog.alert (i18n.frontend.pages.rate.messages.no_student);
                return false;
            }
            
            
            
            // Get all values 
            rate_form.find ('[type="radio"]:checked').each (function (key, item) {
                
                /** @var self DOM */
                var self = $(item);
                
                
                /** @var evidence_field String */
                var evidence_field = self.attr ('name') + '-evidences';
                
                
                // Set value and evidence
                rating['values'][self.attr ('name')] = {
                    'value': self.val (),
                    'evidence': rate_form.find ('[name="' + evidence_field + '"]').val ()
                }
            });
            
            
            // Store ratings
            db.put ('ratings', rating);
            
            
            // Notify the user
            vex.dialog.alert ('Done!');
            
            
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
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
        var template_params = helpers.i18n_tpl ();
        
        
        // Send data to the template
        wrapper.html (template.render (template_params));
        
        
        // Get elements
        var rate_form = wrapper.find ('form');
        
        
        // Populate projects
        helpers.populate_select (wrapper.find ('[name="project"]'), 'projects', project_id);
        
        
        // Populate rubrics
        helpers.populate_select (wrapper.find ('[name="rubric"]'), 'rubrics', rubric_id);
        
        
        /** @var select_student_or_group Select2 Populate groups and students in the same group */
        var select_student_or_group = wrapper.find ('[name="student"]');
        
        
        // Populate first the groups and subgroups
        helpers.populate_select_group (select_student_or_group, group_id).then (function () {
        
        
            // Create a section within the select
            select_student_or_group.append ($("<optgroup />").attr ('label', 'Students'));
            
            
            // Retrieve all students
            db.getAll ('students').then (function (students) {
                
                // For each student
                for (const student of students) {
                    
                    // Include student in the selector
                    select_student_or_group
                        .find ('optgroup:last-child')
                            .append ($("<option />")
                                .attr ('value', student.id)
                                .attr ('selected', student_id && student_id == student.id)
                                .attr ('data-is-student', 'true')
                                .text (student.name)
                            );
                }
            });
            
        });
        
        
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
            wrapper.find ('.student-profile-placeholder').html (template_student_profile.render (student));
           
        }).catch (function (e) {
            console.log (e);
        });
  
        
        // Bind change form
        wrapper.find ('.filters').find ('select').on ('select2:select', function (e) {
            
            /** @var rubric_id int */
            var rubric_id = wrapper.find ('[name="rubric"]').val () * 1;
            
            
            /** @var project_id int */
            var project_id = wrapper.find ('[name="project"]').val () * 1;
            
            
            /** @var student_select boolean */
            var is_student = wrapper.find ('[name="student"]').find (':selected').data ('is-student') ? true : false;
            
            
            /** @var student_id int */
            var student_id = is_student ? (wrapper.find ('[name="student"]').val () * 1) : "";
            
            
            /** @var group_id int */
            var group_id = is_student ? "" : (wrapper.find ('[name="student"]').val () * 1);
            
            
            // Update hash
            window.location.hash = 'rate/' + rubric_id + '/' + student_id + '/' + project_id + '/' + group_id;
            
        });
        
        
        // Submit rating
        rate_form.submit (function (e) {
            
            // Prevent default
            e.preventDefault ();
            
            
            // Validate that the selection has an project
            if ( ! project_id) {
                vex.dialog.alert (i18n.frontend.pages.rate.messages.no_project);
                return false;
            }
            
            
            /** @var values Object Here we will store the results */
            var values = {};
            
            
            // Get all values 
            rate_form.find ('[type="radio"]:checked').each (function (key, item) {
                
                /** @var self DOM */
                var self = $(item);
                
                
                /** @var evidence_field String */
                var evidence_field = self.attr ('name') + '-evidences';
                
                
                // Set value and evidence
                values[self.attr ('name')] = {
                    'value': self.val (),
                    'evidence': rate_form.find ('[name="' + evidence_field + '"]').val ()
                }
            });
            
            
            /** 
             * save_ratings
             *
             * @param student_ids
             */
            var save_ratings = function (student_ids) {
                
                /** @var ratings Array */
                var ratings = [];
                
                
                // Create a rating for each student
                for (const student_id of student_ids) {
                    ratings.push ({
                        'created': new Date (),
                        'student_id': student_id,
                        'project_id': project_id,
                        'rubric_id': rubric_id,
                        'values': values
                    });
                }
                
                
                // Store all ratings at once
                db.updateItems ('ratings', ratings).then (function () {
                    vex.dialog.alert (i18n.frontend.pages.rate.messages.success);
                }).catch (function (e) {
                    console.log (e); 
                });
            }
            
            
            // If only one student was selected, it is easy
            if (student_id) {
                save_ratings ([student_id]);
                
            // But if the element is a group, we need to fetch all students
            // that belong to the group
            } else if (group_id) {
                
                /** @var student_ids Array Retrieve all student ids */
                var student_ids = [];

                
                // Retriege all students
                db.getAll ('students').then (function (students) {
                    
                    // And for each one
                    for (const student of students) {
                        // Check if he belongs to my group
                        if (student.groups.indexOf (group_id) != -1) {
                            student_ids.push (student.id);
                        }
                    }
                    
                    
                    // Save them
                    save_ratings (student_ids);
                    
                });
            }
        });
        
        
        // Remove loading state
        $('body').removeClass ('loading-state');
        
    }
    
    
    // Return public API
    return {
        index: index
    }
}) ;
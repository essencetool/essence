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
    'i18n!nls/translations'
], function (tpl, tpl_rubric_form, tpl_student_box, $, hogan, config, db, i18n) {

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
        
        
        /** @var group_id int */
        var group_id = params[2] * 1;
        
        
        /** @var student_id int */
        var student_id = params[3] * 1;
        
        
        /** @var project_id int */
        var project_id = params[4] * 1;
        
        
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
        db.getAll ('projects').then (function (projects) {
            
            /** @var select DOM */
            var select = wrapper.find ('[name="project"]');
            
             
            // Get project
            if (project_id) {
                projects.find (x => x.id).is_selected = false;
                projects.find (x => x.id === project_id).is_selected = true;
            }
            
            
            // Iterate over the groups
            $.each (projects, function (index, project) {
                select.append ($("<option />")
                    .attr ('value', project.id)
                    .attr ('selected', project.is_selected)
                    .text (project.name)
                );
            });
            
            
            // Render select2 field
            select.prop ('disabled', false).select2 ();
            
        });
        
        
        // Populate rubrics
        db.getAll ('rubrics').then (function (rubrics) {
            
            /** @var select DOM */
            var select = wrapper.find ('[name="rubric"]');
            
             
            // Get rubric
            if (rubric_id) {
                rubrics.find (x => x.id).is_selected = false;
                rubrics.find (x => x.id === rubric_id).is_selected = true;
            }
            
            
            // Iterate over the groups
            $.each (rubrics, function (index, rubric) {
                
                select.append ($("<option />")
                    .attr ('value', rubric.id)
                    .attr ('selected', rubric.is_selected)
                    .text (rubric.name)
                );
            });
            
            
            // Render select2 field
            select.prop ('disabled', false).select2 ();
            
        });
        
        
        // Populate groups
        
        /** @var select DOM */
        var select_group = wrapper.find ('[name="group"]');

            
        db.getAllGroups ().then (function (groups) {
            
            $.each (groups, function (index, group) {
            
                // Append the optgroup
                select_group.append ($("<optgroup />").attr ('label', group.name));
                
                
                // Get rubric
                if (group_id) {
                    $.each (group.subgroups, function (index, subgroup) {
                        subgroup.is_selected = subgroup.id = group_id;
                    });
                }
                
                
                // Iterate over the subgruoups
                $.each (group.subgroups, function (index_subgroup, subgroup) {
                    select_group
                        .find ('optgroup:last-child')
                            .append ($("<option />")
                                .attr ('value', subgroup.id)
                                .attr ('selected', subgroup.is_selected)
                                .text (subgroup.name)
                            );
                });
                
            });

            select_group.prop ('disabled', false).select2 ();
            
        });
        

        
        // Populate students
        db.getAll ('students').then (function (students) {
            
            /** @var select DOM */
            var select = wrapper.find ('[name="student"]');
            
             
            // Get student
            if (student_id) {
                students.find (x => x.id).is_selected = false;
                students.find (x => x.id === student_id).is_selected = true;
            }
            
            
            // Iterate over the groups
            $.each (students, function (index, student) {
                
                // Filtering students not of the selected group
                if (group_id && student.group_id.indexOf (group_id) == -1) {
                    return true;
                }
                
                select.append ($("<option />")
                    .attr ('value', student.id)
                    .attr ('selected', student.is_selected)
                    .text (student.name)
                );
            });
            
            
            // Render select2 field
            select.prop ('disabled', false).select2 ();
            
        });
        
        
        // Render the rubric if available
        if (rubric_id) db.getByID ('rubrics', rubric_id).then (function (rubric) {
            
            // Update form
            wrapper
                .find ('[name="rubric_id"]')
                    .val (rubric.id)
                    .end ()
            
            
            // Render HTML
            rate_form.find ('.rubric-form-placeholder').html (template_rubric_form.render (rubric));
            
            
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
            db.getRatingById ([project_id, rubric_id, student_id], function (rating) {
                
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
                    + '/' + wrapper.find ('[name="group"]').val () 
                    + '/' 
                    + '/' + wrapper.find ('[name="project"]').val ()
                ;
                return;

            }
            
            
            wrapper
                .find ('[name="student_id"]')
                    .val (student.id)
                    .end ()
                .find ('.student-profile-placeholder')
                    .html (template_student_profile.render (student))
            ;
           
        });
  
        
        // Bind change form
        wrapper.find ('[name="rubric"], [name="student"], [name="group"], [name="project"]').on ('select2:select', function (e) {
            window.location.hash = 
                'rate'
                + '/' + wrapper.find ('[name="rubric"]').val () 
                + '/' + wrapper.find ('[name="group"]').val () 
                + '/' + wrapper.find ('[name="student"]').val ()
                + '/' + wrapper.find ('[name="project"]').val ();
        });        
        
        
        
        
        // Submit rating
        rate_form.submit (function (e) {
            
            /** @var rating Object */
            var rating = {
                'student_id': student_id,
                'project_id': project_id,
                'rubric_id': rubric_id,
                'values': {}
            };
            
            
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
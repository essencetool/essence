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
        
        
        /** @var ratings Make it the default option */
        var ratings = localStorage.getItem ('ratings') ? JSON.parse (localStorage.getItem ('ratings')) : {};
        
        
        var has_rubric = rubric_id != null;
        var has_ratings = ! $.isEmptyObject (ratings);
        
        
        /** @var template_params Object */
        var template_params = {};
        template_params['i18n'] = function () {
            return function (text, render) {
                return ref (i18n, text);
            }
        };
        
        
        // Send data to the template
        wrapper.html (template.render (template_params));
        
        
        // Populate projects
        db.getAll ('projects', function (projects) {
            
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
        db.getAll ('rubrics', function (rubrics) {
            
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
        db.getAll ('groups', function (groups) {
            
            /** @var select DOM */
            var select = wrapper.find ('[name="group"]');
            
            
            // Iterate over the groups
            $.each (groups, function (index, group) {
                
                // Append the optgroup
                select.append ($("<optgroup />").attr ('label', group.name));
                
                
                // Get rubric
                if (group_id) {
                    group.subgroups.find (x => x.id).is_selected = false;
                    group.subgroups.find (x => x.id === group_id).is_selected = true;
                }
                
                
                // Iterate over the subgruoups
                $.each (group.subgroups, function (index_subgroup, subgroup) {
                    select
                        .find ('optgroup:last-child')
                            .append ($("<option />")
                                .attr ('value', subgroup.id)
                                .attr ('selected', subgroup.is_selected)
                                .text (subgroup.name)
                            );
                });
                
            });
            
            
            // Render select2 field
            select.prop ('disabled', false).select2 ();
            
        });
        
        
        // Populate students
        db.getAll ('students', function (students) {
            
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
        
        
        // Render rubric form
        if (rubric_id) db.getByID ('rubrics', rubric_id, function (rubric) {
            
            // Update form
            wrapper
                .find ('[name="rubric_id"]')
                    .val (rubric.id)
                    .end ()
            
            
            /** @var has_evidences boolean Determine if we have results for this rubric */
            var has_evidences = 
                ratings
                && ratings[project_id]
                && ratings[project_id][rubric_id]
                && ratings[project_id][rubric_id][student_id]
            ;
            
            
            // Update rubric information with the last score of the user
            if (has_evidences) $.each (rubric.rows, function (index, row) {
                
                // Update evidence
                row.evidence = ratings[project_id][rubric_id][student_id][row.key]
                    ? ratings[project_id][rubric_id][student_id][row.key]['evidence']
                    : ""
                ;
                
                
                // Determine the value of each row
                $.each (row.values, function (index, item) {
                    item.is_selected = ratings[project_id][rubric_id][student_id][row.key]
                        ? (item.id == (ratings[project_id][rubric_id][student_id][row.key]['value'] * 1)) 
                        : false
                    ;
                });
            });

            
            // Render HTML
            wrapper.find ('.rubric-form-placeholder').html (template_rubric_form.render (rubric));
            
            
            // Attach evidence
            wrapper.find ('.attach-evidence-action').unbind ().click (function (e) {
                $(this).closest ('tr').next ().toggleClass ('has-evidence');
            });
            
            
            // Bind remove selection
            wrapper.find ('.remove-selection-action').unbind ().click (function (e) {
                $(e.target).closest ('tr').find ('[type="radio"]').prop ('checked',false);
            });

        
        });
        
        
        // If we have an student selected, when can print their information
        // on the screen
        if (student_id) db.getStudentById (student_id, function (student) {
            
            wrapper
                .find ('[name="student_id"]')
                    .val (student.id)
                    .end ()
                .find ('.student-profile-placeholder')
                    .html (template_student_profile.render (student))
            ;
           
        });
        
        
        
        // Get elements
        var rate_form = wrapper.find ('form');
        
        
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
            
            /** @var ratings Object */
            var ratings = {};
            
            
            // Get all values 
            rate_form.find ('[type="radio"]:checked').each (function (key, item) {
                
                /** @var self DOM */
                var self = $(item);
                
                
                /** @var evidence_field String */
                var evidence_field = self.attr ('name') + '-evidences';
                
                
                // Set value and evidence
                ratings[self.attr ('name')] = {
                    'value': self.val (),
                    'evidence': rate_form.find ('[name="' + evidence_field + '"]').val ()
                }
            });

            
            /** @var all_ratings Item */
            var all_ratings = localStorage.getItem ('ratings') ? JSON.parse (localStorage.getItem ('ratings')) : {};

            
            
            // Update ratings
            if ( ! all_ratings[project_id]) {
                all_ratings[project_id] = {};
            }
            
            if ( ! all_ratings[project_id][rubric_id]) {
                all_ratings[project_id][rubric_id] = {};
            }
            
            if ( ! all_ratings[project_id][rubric_id][student_id]) {
                all_ratings[project_id][rubric_id][student_id] = {};
            }
            
            all_ratings[project_id][rubric_id][student_id] = ratings;
            
            
            // Store ratings
            localStorage.setItem ('ratings', JSON.stringify (all_ratings));
            
            
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
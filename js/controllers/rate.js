/**
 * RateController
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/rate.html',
    'text!templatePath/templates/rubric-form.html',
    'jquery', 
    'hogan',
    'config', 
    'db',
    'helpers',
    'i18n!nls/translations'
], function (tpl, tpl_rubric_form, $, hogan, config, db, helpers, i18n) {

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
        var template_rubric_form = hogan.compile (tpl_rubric_form);
        
        
        /** @var project_id int */
        var project_id = params[1] * 1;
        
        
        /** @var rubric_id int */
        var rubric_id = params[2] * 1;
        
        
        /** @var filter_string String */
        var filter_string = params[3];
        
        
        // Extract information from the filter
        if (filter_string) {
            
            /** @var filer_Type String */
            var filter_type =  filter_string.split (':')[0];
            
            
            /** @var filter_id int */
            var filter_id =  filter_string.split (':')[1] * 1;
        
        }
        
        
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
        
        
        /** @var select_filter Select2 */
        var select_filter = wrapper.find ('[name="filter"]');
        
        
        // Populate first the groups and subgroups
        db.getAllGroups ().then (function (groups) {
            
            // Iterate over each group
            $.each (groups, function (index, group) {
            
                // Create a section within the select
                select_filter.append ($("<optgroup />").attr ('label', group.name));
                
                
                // Include all subgroups
                select_filter
                    .find ('optgroup:last-child')
                        .append ($("<option />")
                            .attr ('value', group.id)
                            .attr ('data-type', 'group')
                            .prop ('selected', filter_type == 'group' && filter_id == group.id)
                            .text (i18n.common.controls.include_all_subgroups.text)
                        )
                ;
                
                
                // Iterate over the subgruoups
                $.each (group.subgroups, function (index_subgroup, subgroup) {
                    select_filter.find ('optgroup:last-child').append (
                        $("<option />")
                            .attr ('value', subgroup.id)
                            .attr ('data-type', 'subgroup')
                            .prop ('selected', filter_type == 'subgroup' && filter_id == subgroup.id)
                            .text (subgroup.name) 
                    )
                });
            });
        
            
            // Now iterate over students
            // First, create a section within the select for students
            select_filter.append (
                $("<optgroup />")
                    .attr ('label', i18n.frontend.pages.rate.controls.filter.optgroup)
            );
            
            
            // Retrieve all students
            db.getAll ('students').then (function (students) {
                
                // Sort students
                students.sort ((a,b) => a.name.localeCompare (b.name));
                
                
                // For each student
                for (const student of students) {
                    
                    // Include student in the selector
                    select_filter.find ('optgroup:last-child').append (
                        $("<option />")
                            .attr ('value', student.id)
                            .prop ('selected', filter_type == 'student' && filter_id == student.id)
                            .attr ('data-type', 'student')
                            .text (student.name)
                    );
                }
            
            
                // Refresh the field
                select_filter.select2 ();
                
            });
            
        });
        
        
        // Render the rubric if available
        if (rubric_id) db.getByID ('rubrics', rubric_id).then (function (rubric) {
            
            // Include i18n
            rubric = helpers.i18n_tpl (rubric);
            
            
            // Render the rubric form
            rate_form.find ('.rubric-form-placeholder').html (template_rubric_form.render (rubric));
            
            
            // Attach evidence
            wrapper.find ('.attach-evidence-action').unbind ().click (function (e) {
                $(this).closest ('tr').next ().toggleClass ('has-evidence');
            });
            
            
            // Bind remove selection
            wrapper.find ('.remove-selection-action').unbind ().click (function (e) {
                $(e.target).closest ('tr').find ('[type="radio"]').prop ('checked',false);
            });
        });
        
        
        // Bind change form
        wrapper.find ('.filters').find ('select').on ('select2:select', function (e) {
            
            /** @var project_id int */
            var project_id = wrapper.find ('[name="project"]').val () * 1;
            
            
            /** @var rubric_id int */
            var rubric_id = wrapper.find ('[name="rubric"]').val () * 1;
            
            
            /** @var filter_type String */
            var filter_type = wrapper.find ('[name="filter"]').find (':selected').data ('type');
            
            
            /** @var filter_id int */
            var filter_id = wrapper.find ('[name="filter"]').val () * 1;
            
            
            /** @var filter String */
            var filter = filter_type ? filter_type + ":" + filter_id : "";
            
            
            // Update hash
            window.location.hash = 'rate/' + project_id + '/' + rubric_id + '/' + filter;
            
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
            
            
            /** @var filter_type String Get the element that was selected */
            var filter_type = wrapper.find ('[name="filter"]').find (':selected').data ('type');
            
            
            /** @var filter_id int Get the element that was selected */
            var filter_id = wrapper.find ('[name="filter"]').val () * 1;
            
            
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
                
                if ( ! student_ids.length) {
                    vex.dialog.alert (i18n.frontend.pages.rate.messages.no_student);
                    return;
                }
                
                
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
            switch (filter_type) {
                
                // Rating an student
                case 'student':
                    save_ratings ([filter_id]);
                    break;
                    
                // By group
                case 'group':
                
                    /** @var student_ids Array Retrieve all student ids */
                    var student_ids = [];
                    
                    
                    // Get the selected grouup
                    db.getAllByKey ('subgroups', 'group_id', filter_id).then (function (subgroups) {
                        
                        /** @var subgroup_ids Array Retrieve all subgropus ids */
                        var subgroup_ids = pluck (subgroups, 'id');
                        
                        
                        // Retriege all students
                        db.getAll ('students').then (function (students) {
                            
                            // And for each one
                            for (const student of students) {
                                
                                // Check if he belongs to my group
                                if (student.groups.some (r => subgroup_ids.includes(r))) {
                                    student_ids.push (student.id);
                                }
                            }
                            
                            
                            // Save them
                            save_ratings (student_ids);
                            
                        });
                    });
                    break;
                    
                
                // By subgroup
                case 'subgroup':
                
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
                    break;
                    
                
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
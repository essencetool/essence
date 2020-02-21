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
    'i18n!nls/translations',
    'i18n!nls/rubrics'
], function (tpl, tpl_rubric_form, $, hogan, config, db, helpers, i18n, i18n_rubrics) {

    /** @var wrapper DOM zero element */
    var wrapper;
    
    
    /** @var current_ratings Array Holds all the ratings that are being evaluated right now */
    var current_ratings = [];
    
    
    /** @var current_rating Object Holds the current rating */
    var current_rating = {};
    

    /** @var project_id int Holds the current project */
    var project_id;
    
    
    /** @var rubric_id int Holds the current project */
    var rubric_id;
    
    
    /** @var filter_string String olds the current filter. Ex: student:3|group:1|subgroup:3 */
    var filter_string;
    
        
    /** @var filer_Type String Holds the current filter type */
    var filter_type;
    
    
    /** @var filter_id int Holds the current filter id */
    var filter_id;
    
    
    /**
     * index
     *
     * Entry point of the map perspective
     *
     * @package EssenceTool
     */
    var index = function (params) {
        
        /** @var main_menu jQuery */
        var main_menu = $('.pure-menu-link');
        
        
        /** @var _force_quit boolean This variable will be used to detect when 
                                     to force to remove the page and avoid 
                                     that the click event is fired continously */
        var _force_quit = false;
        
        
        // Rate is an special case to leave this page
        main_menu.unbind ().click (function (e) {
            
            // If there is not work done, we can exit freely
            if (( ! current_ratings.length && jQuery.isEmptyObject (current_rating.values)) ||  _force_quit) {
                
                // Remove click events
                main_menu.unbind ();
                
                
                // Restart
                _force_quit = false;
                
                
                // Clear previous work
                current_ratings = [];
                
                
                // Exit without preventing default
                return;
            }
            
            
            /** @var self jQuery */
            var self = $(this);
            
            
            // Prevent default action to avoid hash change
            e.preventDefault ();
            
            
            // Request for user confirmation
            vex.dialog.confirm ({
                message: i18n.frontend.pages.rate.confirm.leave_page,
                callback: function (response) {
                    
                    // The user has decided to stay in the page
                    if ( ! response) {
                        return;
                    }
                    
                    
                    _force_quit = true;
                    
                    
                    // If the user decided to move...
                    self[0].click();
                    
                }
            });
            
        });


        
        // Get wrapper
        wrapper = $('#wrapper');
        
        
        // Render templates
        var template = hogan.compile (tpl);
        var template_rubric_form = hogan.compile (tpl_rubric_form);
        
        
        // Populate params
        project_id = params[1] * 1;
        rubric_id = params[2] * 1;
        filter_string = params[3];
        
        
        // Extract information from the filter
        if (filter_string) {
            filter_type =  filter_string.split (':')[0];
            filter_id =  filter_string.split (':')[1] * 1;
        }
        
        
        // Each time that this section is refreshed, the current rating is renewed
        current_rating = find_rating (project_id, rubric_id, filter_string) || {
            'project_id': project_id,
            'rubric_id': rubric_id,
            'filter': filter_string,
            'values': {}
        };
        
        
        // Send data to the template
        wrapper.html (template.render (helpers.i18n_tpl ()));
        
        
        /** @var rate_form jQuery */
        var rate_form = wrapper.find ('form');
        
        
        /** @var select_project jQuery */
        var select_project = wrapper.find ('[name="project"]');
        
        
        /** @var select_rubric jQuery */
        var select_rubric = wrapper.find ('[name="rubric"]');
        
        
        /** @var select_filter jQuery */
        var select_filter = wrapper.find ('[name="filter"]');
        
        
        // Populate filtersa¡
        helpers.populate_select (select_project, 'projects', project_id);
        helpers.populate_select (select_rubric, 'rubrics', rubric_id, i18n_rubrics);
        populate_select_filter (select_filter);
        
        
        // Render the rubric if available
        if (rubric_id) db.getByID ('rubrics', rubric_id).then (function (rubric) {
            
            // i18n of the rubirc
            helpers.i18n_rubric (rubric, i18n_rubrics[rubric.id]);
            
            
            // Some languages require that ratings work in reverse order
            if ('se-se' == localStorage.getItem ('locale')) {
                
                // Reverse valorations
                rubric.valorations = rubric.valorations.reverse ();
                
                
                // Reverse values
                $.each (rubric.rows, function (index, row) {
                    row.values = row.values.reverse ();
                });
            }
            
            
            // Include i18n
            rubric = helpers.i18n_tpl (rubric);
            
            
            // Render the rubric form
            rate_form.find ('.rubric-form-placeholder').html (template_rubric_form.render (rubric));
            
            
            // Attach evidence action
            wrapper.find ('.attach-evidence-action').unbind ().click (function (e) {
                $(this).closest ('tr').next ().toggleClass ('has-evidence');
            });
            
            
            // Attach remove selection action
            wrapper.find ('.remove-selection-action').unbind ().click (function (e) {
                $(e.target).closest ('tr').find ('[type="radio"]').prop ('checked',false);
            });
            
            
            // Attach minimize-maximize table
            wrapper.find ('.minimize-maximize-action').unbind ().click (function (e) {
                $(e.target).closest ('tr').toggleClass ('is-minimized');
            });
            
            
            // Re-bind the information in the rate form
            if ( ! jQuery.isEmptyObject (current_rating.values)) {
                
                // Iterate over values
                $.each (current_rating.values, function (key, value) {
                    
                    /** @var key_filter String */
                    var key_filter = '[data-key="' + key + '"]';
                    
                    
                    // Automatically display the evidence row if there has en 
                    // evidence
                    rate_form.find ('.evidences-row').filter (key_filter).toggleClass ('has-evidence', value.evidence != "");
                    
                    
                    // Mark the radio button
                    rate_form
                        .find ('input[type="radio"]')
                            .filter (key_filter)
                            .filter ('[value="' + value.value + '"]')
                                .prop ('checked', true)
                    ;
                    
                    
                    // Write down the previous stores evidence
                    rate_form
                        .find ('textarea')
                            .filter (key_filter)
                            .val (value.evidence)
                    ;
                });
            }
            
            
            // Remember the changes in the current rating
            rate_form.find ('[type="radio"], textarea').unbind ().change (function () {
                
                /** @var self jQuery */
                var self = $(this);
                
                
                /** @var key String */
                var key = self.attr ('data-key');
                
                
                /** @var field jQuery */
                var field = rate_form.find ('[type="radio"][data-key="' + key + '"]:checked');
                
                
                /** @var evidence_field jQuery */
                var evidence_field = rate_form.find ('textarea[data-key="' + key + '"]');
                
                
                // Attach information to the rating
                current_rating.values[key] = {
                    'value': field.val (),
                    'evidence': evidence_field.val ()
                };
            });
            
        });
        
        
        // Bind filters
        wrapper.find ('.filters').find ('select').unbind ().on ('select2:select', function (e) {
            
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
            
            
            // Ensure that the current rating is updated or created
            save_or_update_current_rating ();
            
            
            // Remove filters, because they are going to be rebinded after 
            // the reload
            wrapper.find ('.filters').find ('select').select2 ('destroy');
            
            
            // Restart, because the filters has changed
            index (['rate', project_id, rubric_id, filter]);
            
        });
        
        
        // Submit rating
        rate_form.unbind ().submit (function (e) {
            
            // Prevent default
            e.preventDefault ();
            
            
            // Save or update the current rating
            save_or_update_current_rating ();
            
            
            // Validate that the selection has an project
            if ( ! current_ratings.length) {
                vex.dialog.alert (i18n.frontend.pages.rate.messages.no_ratings_to_save);
                return false;
            }
            
            
            /** 
             * save_ratings
             *
             * @param student_ids
             */
            var save_ratings = function (project_id, rubric_id, student_ids, values) {
                
                // Return promise
                return new Promise ((resolve, reject) => {
                
                    // No students selected in this group. Ok...
                    if ( ! student_ids.length) {
                        resolve ();
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
                        resolve ();
                    }).catch (function (e) {
                        reject (e);
                    });
                    
                });
            }
            
            
            /** @var callbacks int */
            var callbacks = current_ratings.length;
            
            
            /** 
             * @var resolve_callbacks 
             *
             * This function will be executed every time that a new save_ratings was 
             * executed and it will be use a countdown to know when every elements
             * are stored in the database
             */
            var resolve_callbacks = function () {
                
                // Reduce the callback counter
                callbacks--;
                
                
                // When the countdown reaches to zero...
                if ( ! callbacks) {
                    
                    // Reset the current ratings variable
                    current_ratings = [];
                    
                    
                    // Restart
                    vex.dialog.alert ({
                        message: i18n.frontend.pages.rate.messages.success,
                        callback: function () {
                            index (['rate']);
                        }
                    });
                    
                }
            }
            
            
            // Iterate over all the current ratings performed.
            // Every rating consists in a project, rating and a filter
            $.each (current_ratings, function (index, current_rating) {
                
                /** @var project_id int */
                var project_id = current_rating.project_id * 1;
                
                
                /** @var rating_id int */
                var rating_id = current_rating.rating_id * 1;
                
                
                /** @var rubric_id int */
                var rubric_id  = current_rating.rubric_id * 1;
                
                
                /** @var filter_string String */
                var filter_string = current_rating.filter;
                
                
                /** @var filter_type String Get the element that was selected */
                var filter_type = filter_string.split (':')[0];
                
                
                /** @var filter_id int Get the element that was selected */
                var filter_id = filter_string.split (':')[1] * 1;
                
                
                // If only one student was selected, it is easy
                switch (filter_type) {
                    
                    // Rating an student
                    case 'student':
                        save_ratings (project_id, rubric_id, [filter_id], current_rating.values).then (resolve_callbacks);
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
                                save_ratings (project_id, rubric_id, student_ids, current_rating.values).then (resolve_callbacks);
                                
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
                                if (student.groups.indexOf (filter_id) != -1) {
                                    student_ids.push (student.id);
                                }
                            }
                            
                            
                            // Save them
                            save_ratings (project_id, rubric_id, student_ids, current_rating.values).then (resolve_callbacks);
                            
                        });
                        break;
                        
                }
            });
        });
        
        
        // Remove loading state
        $('body').removeClass ('loading-state');
        
    }
    
    
    
    /** 
     * populate_select_filter
     * 
     * Populates the filter with students, groups and subgrups
     *
     */
    var populate_select_filter = function (select_filter) {
        
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
    }
    
    
    /** 
     * find_rating
     *
     * This function looks over the ratings in session if there is already 
     * one with the same project, rubric and filter
     *
     * This is a helper function, so variables are taken from the current 
     * scope
     * 
     * @return object|null
     */
    var find_rating = function (project_id, rubric_id, filter) {
        
        /** @var response Object|null */
        var response;
        
        
        // Iterate over all the existing ratings
        $.each (current_ratings, function (index, rating) {
            
            // Check if there is a rating with the same project, rubric and filter
            if (
                rating.project_id == project_id
                && rating.rubric_id == rubric_id 
                && rating.filter == filter
            ) {
                // Store the response
                response = rating;
                
                
                // Stop searching
                return false;
            }
        });
        
        
        // Return the response
        return response;
    
    }
    
    
    /**
     * save_or_update_current_rating
     *
     * This function ensures that the current rating is stored 
     * before the user changes the filter or presses the 
     * submit button
     */
    var save_or_update_current_rating = function () {
        
        /** @var found object|null This variable will hold the reference of a similar rating */
        var found = find_rating (project_id, rubric_id, filter_string);
        
        
        // If the rating was found, the variable will hold the current rating, so we can replace
        // with a new one. If not, the current rating was added.
        if (project_id && rubric_id && filter_id) {
            if (found) {
                found = current_rating;
            } else {
                if ( ! jQuery.isEmptyObject (current_rating.values)) {
                    current_ratings.push (jQuery.extend (true, {}, current_rating));
                }
            }
        }
        
    }
    
    
    // Return public API
    return {
        index: index
    }
}) ;
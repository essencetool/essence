/**
 * RateController
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/rate.html',
    'jquery', 
    'hogan',
    'config', 
    'i18n!nls/translations',
    'json!assetsPath/sample.json',
    'json!assetsPath/students.json',
    'json!assetsPath/groups.json'
], function (tpl, $, hogan, config, i18n, rubrics, students, groups) {

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
        
        
        /** @var template TPL */
        var template = hogan.compile (tpl);
        
        
        /** @var rubric_id int */
        var rubric_id = params[1] * 1;
        
        
        /** @var group_id int */
        var group_id = params[2] * 1;
        
        
        /** @var student_id int */
        var student_id = params[3] * 1;
        
        
        // Get student
        var student = students.find (x => x.id === student_id);
        
        
        // Get rubric
        var rubric = rubrics.find (x => x.id === rubric_id);
        
        
        
        // Make it the default option
        if (student_id) {
            students.find (x => x.id).is_selected = false;
            students.find (x => x.id === student_id).is_selected = true;
        }
        
        
        // Default group
        if (group_id) {
            $.each (groups, function (index, group) {
               $.each (group.subgroups, function (index, subgroup) {
                    subgroup.is_selected = group_id == subgroup.id;
               });               
            });
        }
        
        
        // Default rubric
        if (rubric_id) {
            rubrics.find (x => x.id).is_selected = false;
            rubrics.find (x => x.id === rubric_id).is_selected = true;
        }
        
        
        // Assign group from ID
        if (student) {
            students.map ((student => {
                $.each (groups, function (index, group) {
                    $.each (group.subgroups, function (index, subgroup) {
                        if (subgroup.id == student.group_id) {
                            student.group = subgroup.name;
                        }
                    });
                });
            }));
        }
        
        
        /** @var available_students Array */
        var available_students = group_id ? students.filter (student => student.group_id === group_id) : students;
        
        
        // Make it the default option
        var ratings = localStorage.getItem ('ratings');
        ratings = JSON.parse (ratings);
        
        
        if (rubric) $.each (rubric.rows, function (index, row) {
            $.each (row.values, function (index, item) {
                item.is_selected = (rubric && ratings[student_id]) ? (item.id == (ratings[student_id][row.key] * 1)) : false;
            });
        });


        
        /** @var template_params Object */
        var template_params = {};
        template_params['i18n'] = function () {
            return function (text, render) {
                return ref (i18n, text);
            }
        };
        
        
        // Send data to the template
        template_params['groups'] = groups;
        template_params['rubrics'] = rubrics;
        template_params['rubric'] = rubric;
        template_params['students'] = available_students;
        template_params['student'] = student;
        
        
        
        // Render
        wrapper.html (template.render (template_params));
        
        
        // Get elements
        var rate_form = wrapper.find ('form');
        
        
        // Bind remove selection
        wrapper.find ('.remove-selection-action').unbind ().click (function (e) {
            $(e.target).closest ('tr').find ('[type="radio"]').prop ('checked',false);
        });
        
        
        // Bind change form
        wrapper.find ('[name="rubric"], [name="student"], [name="group"]').change (function (e) {
            window.location.hash = 
                'rate'
                + '/' + wrapper.find ('[name="rubric"]').val () 
                + '/' + wrapper.find ('[name="group"]').val () 
                + '/' + wrapper.find ('[name="student"]').val ();
        });        
        
        
        // Attach evidence
        wrapper.find ('.attach-evidence-action').unbind ().click (function (e) {
            
            var self = $(this);
            var field = self.attr ('data-field');
            
            vex.dialog.open ({
                message: 'Please, comment the evidences',
                input: '<textarea name="notes" rows="6", cols="80"></textarea>',
                buttons: [
                  $.extend({}, vex.dialog.buttons.YES, {
                    text: 'Save'
                  }),
                  $.extend({}, vex.dialog.buttons.NO, {
                    text: 'Cancel'
                  })
                ],
                callback: function (response) {
                    
                    if ( ! response) {
                        return;
                    }
                    
                    console.log (response);
                    
                    wrapper.find ('[name="' + field + '"]').val (response.notes);
                    
                }
            });
        });
        
        
        // Submit rating
        rate_form.submit (function (e) {
            
            /** @var ratings Object */
            var ratings = {};
            
            
            // Get all values 
            rate_form.find ('[type="radio"]:checked').each (function (key, item) {
                var self = $(item);
                ratings[self.attr ('name')] = self.val ();
            });

            
            var all_ratings = localStorage.getItem ('ratings');
            if ( ! all_ratings) {
                all_ratings = {};
            } else {
                all_ratings = JSON.parse (all_ratings);
            }
            
            
            // Update ratings
            all_ratings[student_id] = ratings;
            
            
            // Store ratings
            localStorage.setItem ('ratings', JSON.stringify (all_ratings));
            
            
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
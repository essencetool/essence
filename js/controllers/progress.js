/**
 * Progress Controller
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/progress.html',
    'text!templatePath/templates/progress-chart.html',
    'text!templatePath/templates/progress-student-profile.html',
    'jquery', 
    'hogan',
    'config',
    'db',
    'helpers',
    'i18n!nls/translations',
    'chartjs'
], function (tpl, tpl_progress_chart, tpl_student_row, $, hogan, config, db, helpers, i18n, chartjs) {

    /** @var student_id int */
    var student_id;
    
    
     /** @var project_id int */
    var project_id;
    
    
     /** @var rubric_id int */
    var rubric_id;
        
        
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
        project_id = params[2] * 1;
        rubric_id = params[3] * 1;
        
        
        // Retrieve information about the student
        db.getStudentById (student_id).then (function (student) {
            render (student);
        }).catch (function () {
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
        
        // Include i18n
        student['i18n'] = function () {
            return function (text, render) {
                return ref (i18n, text);
            }
        };
        
    
        /** @var wrapper DOM zero element */
        var wrapper = $('#wrapper');
        
        
        /** @var template TPL */
        var template = hogan.compile (tpl);
        var template_progress_chart = hogan.compile (tpl_progress_chart);
        var template_student_row = hogan.compile (tpl_student_row);
        
        
        /** @var template_params Object */
        var template_params = {};
        template_params['i18n'] = function () {
            return function (text, render) {
                return ref (i18n, text);
            }
        };
        
        
        // Render
        wrapper.html (template.render (template_params));
        
        
        // Append
        wrapper.find ('.student-placeholder').html (template_student_row.render (student));

        
        // Populate selects
        helpers.populate_select (wrapper.find ('[name="project"]'), 'projects', project_id);
        helpers.populate_select (wrapper.find ('[name="rubric"]'), 'rubrics', rubric_id); 
        
        
        // Get rubrics
        db.getAll ('rubrics').then (function (rubrics) {
            
            // Get each rubric
            $.each (rubrics, function (index, rubric) {
                
                // Filter rubrics
                if (rubric_id && rubric.id != rubric_id) {
                    return true;
                }
                
                
                /** @var data Object */
                var data = {
                    labels: pluck (rubric.rows, 'key'),
                    datasets: []
                };
                
                
                // Get the last rubric of this student
                db.getAllByKey ('ratings', 'student_id', student_id).then (function (ratings) {
                    
                    // Check there is no ratings
                    var has_rubrics = false;
                    
                   
                   // Get all ratings
                    $.each (ratings, function (index, rating) {
                        
                        // Not my rubric
                        if (rating.rubric_id != rubric.id) {
                            return true;
                        }
                        has_rubrics = true;
                        
                        
                        /** @var values Array */
                        var values = [];
                        $.each (rating.values, function (key, result) {
                            values.push (result.value * 1); 
                        });
                        
                        
                        /** @var opacity */
                        var opacity = .5 + ((1 / ratings.length) * index);
                        
                        
                        // Create a new dataset
                        data.datasets.push ({
                            label: new Date (rating.created).toUTCString(),
                            data: values,
                            backgroundColor: 'rgba(' + rubric.color.join (',') + ', ' + opacity + ')',
                        });

                    });
                    
                    
                    if ( ! has_rubrics) {
                        return true;
                    }
                    
                    
                    /** @var chart_id String */
                    var chart_id = 'chart-' + rubric.id;
                    
                    
                    /** @var template_params Object */
                    var template_params = {
                        id: chart_id
                    }
                    
                    
                    // Render
                    wrapper.find ('.charts-placeholder').append (template_progress_chart.render (template_params));


                    // Render sample chart
                    new Chart (wrapper.find ('#' + chart_id), {
                        type: 'radar',
                        data: data,
                        defaultFontStyle: 14,
                        options: {
                            responsive: true,
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: rubric.name
                            },
                            scale: {
                                ticks: {
                                    beginAtZero: true,
                                    min: 0,
                                    max: 4
                                }
                            }
                        }
                    });
                    
                });
            });
        });
        
        
        // Bind filter
        wrapper.find ('[name="rubric"], [name="project"]').on ('select2:select', function (e) {
            window.location.hash = 
                'progress'
                + '/' + student_id
                + '/' + wrapper.find ('[name="project"]').val () 
                + '/' + wrapper.find ('[name="rubric"]').val ();
        });

        
        // Remove loading state
        $('body').removeClass ('loading-state');        
        
    }
    
    
    // Return public API
    return {
        index: index
    }
}) ;
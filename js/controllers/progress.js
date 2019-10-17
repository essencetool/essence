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
    
    
    /** @var default_options Object */
    var default_options = {
        responsive: true,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: ''
        },
        scale: {
            ticks: {
                beginAtZero: true,
                min: 0,
                max: 4,
                stepSize: 1,
                fontSize: 16
            }
        },
        tooltips: {
            callbacks: {
                label: label_callback
            }
        }
    };
        
        
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
                
                // Filter rubrics in case that the user has turned on the filter
                if (rubric_id && rubric.id != rubric_id) {
                    return true;
                }
                
                
                /** @var data Object Data for the graph */
                var data = {
                    labels: pluck (rubric.rows, 'key'),
                    datasets: []
                };
                
                
                // Get ratings for the student
                // @todo Improve to get ratings also filtered by rubric_id
                db.getAllByKey ('ratings', 'student_id', student_id).then (function (ratings) {
                    
                    /** @var filtered_ratings Array To get only the ratings */
                    var filtered_ratings = [];
                    
                   
                   // Get all ratings
                    $.each (ratings, function (index, rating) {

                        // Not the rubric i was looking for. Continue
                        if (rating.rubric_id != rubric.id) {
                            return true;
                        }
                        
                        
                        // ATtach rubric for the template
                        rating.rubric = rubric;
                        
                        
                        // Include the values processes, transforming 
                        // from object to array
                        rating._values = [];
                        
                        $.each (rating.values, function (key, value) {
                            
                            /** @var key_text String Stores the textual value of the feature */
                            var key_text = '';
                            $.each (rubric.rows, function (index, row) {
                                if (row.key === key) {
                                    key_text = row.name;
                                    return false;
                                }
                            });
                            
                            
                            // Attach the processes rating for the template
                            rating._values.push ({
                                evidences: value.evidence ? [value.evidence] : null,
                                key: key,
                                key_text: key_text,
                                value: value.value,
                                value_text: rubric.valorations[value.value - 1].text,
                            });
                        });
                        
                        
                        // Update the filtered ratings
                        filtered_ratings.push (rating);
                        
                        
                        /** @var values Array */
                        var values = [];
                        $.each (rating.values, function (key, result) {
                            values.push (result.value * 1); 
                        });
                        
                        
                        /** @var opacity */
                        var opacity = .5 + ((1 / ratings.length) * index);
                        
                        
                        console.log ('rgba(' + rubric.color.join (',') + ', ' + opacity + ')');
                        
                        // Create a new dataset
                        data.datasets.push ({
                            rubric: rubric,
                            rating: rating, 
                            label: new Date (rating.created).toUTCString(),
                            data: values,
                            backgroundColor: 'rgba(' + rubric.color.join (',') + ', ' + opacity + ')',
                        });

                    });
                    
                    
                    // No rubrics, then no render the graph
                    if ( ! filtered_ratings.length) {
                        return true;
                    }
                    
                    
                    /** @var chart_id String */
                    var chart_id = 'chart-' + rubric.id;
                    
                    
                    /** @var template_params Object */
                    var template_params = {
                        id: chart_id,
                        name: rubric.name,
                        ratings: filtered_ratings
                    };
                    
                    
                    template_params['i18n'] = function () {
                        return function (text, render) {
                            return ref (i18n, text);
                        }
                    };
                    
                    
                    // Render
                    wrapper.find ('.charts-placeholder').append (template_progress_chart.render (template_params));
                    
                    
                    // Update name
                    default_options.title.text = rubric.name;
                    
                    
                    // Render sample chart
                    new Chart (wrapper.find ('#' + chart_id), {
                        type: 'radar',
                        data: data,
                        defaultFontStyle: 14,
                        options: default_options,
                        rubric: rubric
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
    
    
    /**
     * label_callback
     *
     * Allows to display the correct rating value and possible evidences
     */
    var label_callback = function (tooltipItem, data) {
        
        
        /** @var dataset_index int */
        var dataset_index = tooltipItem.datasetIndex;
        
        
        /** @var label String */
        var label = data.labels[tooltipItem.index];
        
        
        /** @var rating Object */
        var rating = data.datasets[dataset_index].rating;
        
        
        /** @var rubric Object */
        var rubric = data.datasets[dataset_index].rubric;
        
        
        /** @var evidence String */
        var evidence = rating.values[label].evidence;
        
        
        /** @var score String */
        var score = rubric.valorations[rubric.valorations.length - tooltipItem.yLabel].text;

        
        // Return 
        return $.trim (score + ' ' + evidence) ;

    }
    
    
    // Return public API
    return {
        index: index
    }
}) ;
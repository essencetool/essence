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
    'i18n!nls/rubrics',
    'chartjs',
    'jquery-csv'
], function (tpl, tpl_progress_chart, tpl_student_row, $, hogan, config, db, helpers, i18n, i18n_rubrics, chartjs) {

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
            pointLabels: {
                fontSize: 0
            },
            ticks: {
                beginAtZero: true,
                min: 0,
                max: 4,
                stepSize: 1,
                fontSize: 16,
                userCallback: label_callback
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
        
        // Resolve parameters and treat them as numer
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
        student = helpers.i18n_tpl (student);
        
    
        /** @var wrapper DOM zero element */
        var wrapper = $('#wrapper');
        
        
        /** @var template TPL */
        var template = hogan.compile (tpl);
        
        
        /** @var template_progress_chart TPL */
        var template_progress_chart = hogan.compile (tpl_progress_chart);
        
        
        /** @var template_student_row TPL */
        var template_student_row = hogan.compile (tpl_student_row);
        
        
        /** @var template_params Object */
        var template_params = helpers.i18n_tpl ();
        
        
        // Render
        wrapper.html (template.render (template_params));
        
        
        // Render the student box
        wrapper.find ('.student-placeholder').html (template_student_row.render (student));

        
        // Populate selects
        helpers.populate_select (wrapper.find ('[name="project"]'), 'projects', project_id);
        helpers.populate_select (wrapper.find ('[name="rubric"]'), 'rubrics', rubric_id, i18n_rubrics); 
        
        
        // Show attachment in a popup
        wrapper.off ('click.show_evidence').on ('click.show_evidence', '.show-attachment-action', function () {
            var self = $(this);
            vex.dialog.alert (self.attr ('title'));
        });
        
        
        
        // Get all available rubrics
        db.getAll ('rubrics').then (function (rubrics) {
            
            // Get each rubric
            $.each (rubrics, function (index, rubric) {
                
                // Filter rubrics in case that the user has turned on the filter
                if (rubric_id && rubric.id != rubric_id) {
                    return true;
                }
                
                
                // i18n of the rubirc
                helpers.i18n_rubric (rubric, i18n_rubrics[rubric.id]);
                
                
                /** @var data Object Data for the graph */
                var data = {
                    labels: [],
                    datasets: []
                };
                
                
                // Get ratings for the student
                db.getAllByKey ('ratings', 'student_id', student_id).then (function (ratings) {
                    
                    /** @var filtered_ratings Array To get only the ratings */
                    var filtered_ratings = [];
                    
                   
                   // Get all ratings
                    $.each (ratings, function (index, rating) {

                        // Not the rubric I was looking for. Continue
                        if (rating.rubric_id != rubric.id) {
                            return true;
                        }
                        
                        
                        // Attach rubric data to the rating
                        rating.rubric = rubric;
                        
                        
                        // Include the values processes, transforming 
                        // from object to array
                        rating._values = [];
                        
                        
                        // Fill the values
                        $.each (rating.values, function (key, value) {
                            
                            /** @var key_text String Stores the textual value of the feature */
                            var key_text = '';
                            $.each (rubric.rows, function (index, row) {
                                if (row.key === key) {
                                    data.labels.push (row.name);
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
                        
                        
                        // Populate values
                        $.each (rating.values, function (key, result) {
                            
                            /** @var score int Search for the real score based on the ID */
                            var score = rubric.valorations.find (x => x.id === result.value * 1).score;
                            
                            
                            // Attach to the group
                            values.push (score * 1); 
                        });
                        
                        
                        /** @var opacity float */
                        var opacity = .5 + ((1 / ratings.length) * index);
                        
                        
                        /** @var rgba String */
                        var rgba = 'rgba(' + rubric.color.join (',') + ', ' + opacity + ')';
                        
                        
                        /** @var date String */
                        var date = localStorage.getItem ('locale')
                            ? new Date (rating.created).toLocaleString (localStorage.getItem ('locale'))
                            : new Date (rating.created).toUTCString ()
                        ;
                        
                        
                        // Create a new dataset
                        data.datasets.push ({
                            rubric: rubric,
                            rating: rating, 
                            label: date,
                            data: values,
                            backgroundColor: rgba,
                        });

                    });
                    
                    
                    // No rubrics, then no render the graph
                    if ( ! filtered_ratings.length) {
                        return true;
                    }
                    
                    
                    /** @var chart_id String */
                    var chart_id = 'chart-' + rubric.id;
                    
                    
                    /** @var template_params Object */
                    var template_params = helpers.i18n_tpl ({
                        id: chart_id,
                        name: rubric.name,
                        ratings: filtered_ratings
                    });
                    

                    // Render
                    wrapper.find ('.charts-placeholder').append (template_progress_chart.render (template_params));

                    
                    // This is used to avoid render polar charts from custom rubics with 
                    // dicotomic values
                    if (rubric.rows.length >= 3) {
                    
                        /** @var options Object Create a copy of default options for us */
                        var options = jQuery.extend (true, {}, default_options);
                        
                        
                        // Update metadata of the options
                        options.title.text = rubric.name;
                    
                    
                        // Render chart
                        new Chart (wrapper.find ('#' + chart_id), {
                            type: 'radar',
                            data: data,
                            options: options,
                            rubric: rubric
                        });
                    }
                    
                });
            });
        });
        
        
        /** 
         * export-progress-action
         */
        wrapper.find ('.export-progress-action').click (function (e) {
            
            /** @var lines Array */
            var lines = [];
            
            
            // Iterate over rubrics
            wrapper.find ('.progress-rubric').each (function () {
            
                /** @var rubric jQuery */
                var rubric = $(this);
                
                
                // Attach rubric name
                lines.push ([$.trim ($(this).find ('h2').text  ())]);
               
                
                // Look for ratings
                rubric.find ('.progress-ratings > li').each (function () {
                    
                    /** @var ratings jQuery */
                    var ratings = $(this);
                    
                    
                    // Attach lines
                    lines.push ([$.trim (ratings.find ('h3').html ())]);
                    
                    
                    // Get every rating
                    ratings.find ('li').each (function () {
                        
                        /** @var item jQuery */
                        var item = $(this);
                        
                        
                        /** @var rating jQuery */
                        var rating = item.find ('.value').clone ();
                        
                        
                        /** @var attachment String */
                        var attachment = '';
                        if (rating.find ('.icon-edit').length) {
                            attachment = " " + rating.find ('.icon-edit').attr ('title');
                        }
                        
                        
                        
                        // Remove icon edit
                        rating.find ('.icon-edit').remove ();
                        
                        
                        // Attach
                        lines.push ([
                            $.trim (item.find ('.key').html ()), 
                            $.trim (rating.html () + attachment)
                        ]);
                        
                    });
               });
            });
            
            
            /** @var filename String */
            var filename = student.email + '-' + new Date ().getTime () + '.csv';
            
            
            /** @var csv Array */
            var csv = $.csv.fromArrays (lines);
            
            
            // Download
            helpers.download_file (filename, csv);
            
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
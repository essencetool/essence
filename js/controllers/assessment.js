/**
 * Assessment Controller
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/assessment.html',
    'jquery', 
    'hogan',
    'config', 
    'db',
    'helpers',
    'i18n!nls/translations',
], function (tpl, $, hogan, config, db, helpers, i18n) {
    
    /** @var wrapper DOM */
    var wrapper;
    

    /**
     * index
     *
     * Entry point of the map perspective
     *
     * @package EssenceTool
     */
    var index = function (params) {
        
        // Retrieve all the assessments
        db.getAll ('assessments').then (function (assessments) {
            
            // Iterate over assessments
            $.each (assessments, function (index_assessment, assessment) {
                
                // Hidrate objects for the template engine
                $.each (assessment.questions, function (index_question, question) {
                    
                    // Attach valorations to the question
                    // The usage of jQuery extend is to clone the object 
                    // and to create a new copy of the same
                    // The usage of jQuery map is to convert the object 
                    // to an array
                    question.valorations = $.map ($.extend (true, {}, assessment.valorations), function (value, index) {
                        return [value];
                    });
                    
                    
                    // Create the fieldname for each valoration
                    $.each (question.valorations, function (index_valoration, valoration) {
                        valoration.question_index = index_question;
                        valoration.assessment_id = assessment.id;
                    });
                });
           });
           
           
           // Render the assessments
           render (assessments);
           
        });
    }
    
    
    /**
     * render
     *
     * @param assessments
     */
    
    var render = function (assessments) {
        
        // Start wrapper
        wrapper = $('#wrapper');
        
        
        /** @var template TPL */
        var template = hogan.compile (tpl);
        
        
        /** @var template_params Object */
        var template_params = helpers.i18n_tpl ();
        template_params['assessments'] = assessments;
        
        
        // Render
        wrapper.html (template.render (template_params));
        
        
        /** @var form jQuery Object */
        var form = wrapper.find ('[name="assessment-form"]');
        
        
        // Handle form submision
        form.submit (function (e) {
            
            // Prevent default action
            e.preventDefault ();
            
            
            /** @var name String */
            var name = form.find ('[name="name"]').val ();
            
            
            /** @var email String */
            var email = form.find ('[name="email"]').val ();
            
            
            /** @var results Object To store the results for each assessment */
            var results = {
                name: name,
                email: email,
                assessments: {}
            };
            
            
            // Get the results of the user
            $('[name^="assessment_"]:checked').each (function () {
                
                /** @var self Object */
                var self = $(this);
                
                
                /** @var assessment_id int */
                var assessment_id = self.attr ('data-assessment') * 1;
                
                
                /** @var question_index int */
                var question_index = self.attr ('data-question') * 1;
                

                /** @var value int */
                var value = self.val () * 1;
                
                
                // Create object
                if ( ! results['assessments'][self.attr ('data-assessment')]) {
                    results['assessments'][self.attr ('data-assessment')] = {
                        'total': 0
                    };
                }
                
                
                // Attach the result
                results['assessments'][assessment_id][question_index] = value;
                results['assessments'][assessment_id]['total'] += value;
                
            });
            
            
            /** @var complete_feedback String */
            var complete_feedback = '';
            
            
            // Once we have the total of each assessment, we are going to 
            // get the feedback according to the score
            $.each (results.assessments, function (assessment_id, assessment_results) {
                
                /** @var assessment Object Get information about each assessment */
                var assessment = assessments.find (x => x.id == assessment_id);
                
                
                /** @var total int */
                var total = assessment_results.total;
                
                
                // Look for the feedback more according
                $.each (assessment.feedbacks, function (index, feedback) {
                    
                    /** @var min int */
                    var min = feedback.scores[0];
                    
                    
                    /** @var max int */
                    var max = feedback.scores[1];
                        
                        
                    // Get if the score
                    if (total >= min && total <= max) {
                        
                        // Attach the feedback to the results
                        assessment_results.feedback = feedback.text;
                        
                        
                        // Attach feedback
                        complete_feedback += 
                            '<h2>' + assessment.name + '</h2>' 
                            + assessment.description 
                            + feedback.text
                        ;
                        
                        
                        // Stop search
                        return false;
                    }
                });
            });
            
            
            /** @var download_button Object */
            var download_button = { 
                className: 'vex-dialog-button-primary', 
                text: 'Download results', 
                click: function ($vexContent, event) {
                    
                    /** @var markdown String */
                    var markdown = new Date ().toString () + "\r\n" + name + " <" + email + ">\r\n".repeat (2);
                    
                    
                    // Get content
                    $(complete_feedback).filter ('h2, p').each (function () {
                        
                        /** @var tag jQuery */
                        var tag = $(this);
                        
                        
                        /** @var text String */
                        var text = tag.text ();
                        
                        
                        /** @var separator String */
                        var separator = tag.is ('p') ? "\r\n".repeat (2) : ("\r\n" + "-".repeat (80) + "\r\n");
                        
                        
                        // Attach text
                        markdown += text + separator;
                    
                    });
                    
                    
                    // Include the list of the questions
                    markdown += "\r\n";
                    
                    
                    // Get the assessments in order
                    $.each (assessments, function (index, assessment) {
                        
                        // Include the name of the assessment
                        markdown += assessment.name + "\r\n" + "-".repeat (80) + "\r\n";
                        
                        
                        // Get all the questions of this assessment
                        $.each (assessment.questions, function (index_question, question) {
                            
                            // Include the name of the question
                            markdown += (index_question + 1) + ") " + question.text + "\r\n";
                            
                            
                            // Include all the possibilities
                            $.each (assessment.valorations, function (index_valoration, valoration) {
                                
                                /** @var field_id String */
                                var field_id = 
                                    "#assessment_" 
                                    + assessment.id + "_" 
                                    + index_question + "_" 
                                    + valoration.score
                                ;
                                
                                
                                /** @var is_checked String */
                                var is_checked = form.find (field_id).is (':checked') ? "X" : " ";
                                
                                
                                // Include question
                                markdown += "[" + is_checked + "] " + valoration.text + " ".repeat (4);
                                
                            });
                            
                            
                            // Next line
                            markdown += "\r\n".repeat (2);
                            
                        });
                    });
                    
                    
                    // Download file
                    helpers.download_file ('feedback-' + email + '.txt', markdown);
                    
                    
                    // Close Vex
                    vex.close ("1"); 
                }
            };
            
            
            // Send feedback to the user
            vex.dialog.open ({
                unsafeMessage: complete_feedback,
                className: 'vex-theme-plain full-width',
                buttons: [
                    $.extend ({}, vex.dialog.buttons.NO, download_button),
                    vex.dialog.buttons.NO
                ]
            });
            
        });
        
        
        // Remove loading state
        $('body').removeClass ('loading-state');
        
    }
    
    
    // Return public API
    return {
        index: index
    }
}) ;
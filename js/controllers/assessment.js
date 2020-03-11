/**
 * Assessment Controller
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/assessment.html',
    'text!templatePath/templates/assessment-template.html',
    'jquery', 
    'hogan',
    'config', 
    'db',
    'helpers',
    'i18n!nls/translations',
    'i18n!nls/assessments'
], function (tpl, tpl_download, $, hogan, config, db, helpers, i18n, i18n_assessments) {
    
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
        
        // For students
        if ( ! (params[1] && params[1] == 'educators')) {
            $('body').addClass ('self-assessment-state');
        }
        
        
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
                
                
                // i18n
                helpers.i18n_assessment (assessment, i18n_assessments[assessment["id"]]);
                
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
                
                
                /** @var image String */
                var image_score = '';
               
                
                // Look for the feedback more according
                $.each (assessment.images, function (index, image) {
                    
                    /** @var min int */
                    var min = image.scores[0];
                    
                    
                    /** @var max int */
                    var max = image.scores[1];
                    
                    
                    // Get if the score
                    if (total >= min && total <= max) {

                        // Update img
                        image_score = 
                            '<figure>' 
                            + '<img alt="score" src="img/' + image.path + '" />'
                            + '</figure>'
                        ;

                        
                        // Stop search
                        return false;
                    }
                });
                
                
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
                            + '<div class="feedback_assessment_description">' + assessment.description + image_score + '</div>'
                            + '<div class="feedback_assessment_text">' + feedback.text + '</div>'
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
                    
                    /** @var number_of_callbacks int */
                    var number_of_callbacks = $(complete_feedback).find ('img').length;
                    
                    
                    // Iterate
                    $(complete_feedback).find ('img').each (function () {
                        
                        /** @var img */
                        var img = $(this);
                        
                        
                        // Replace
                        toDataURL (img.attr ('src'), function (base64) {
                            
                            // Replace img in the HTML code
                            complete_feedback = complete_feedback.replace (img.attr ('src'), base64)
                            
                            
                            // Remove a callback
                            number_of_callbacks--;
                            
                            
                            // last callback
                            if ( ! number_of_callbacks) {
                                
                                /** @var template TPL */
                                var template = hogan.compile (tpl_download);
                                
                                
                                /** @var template_params Object */
                                var template_params = helpers.i18n_tpl ();
                                template_params['html'] = new Date ().toString () + "\r\n" + name + " <" + email + ">\r\n".repeat (2) + complete_feedback;

                                
                                /** @var html String Render */
                                html = template.render (template_params);

                                
                                // Download all the file
                                helpers.download_file ('feedback-' + email + '.html', html);
                                
                                
                                // Close Vex
                                vex.close ("1"); 
                                
                            }
                        });
                    });
                }
            };
            
            
            // Send feedback to the user
            vex.dialog.open ({
                unsafeMessage: complete_feedback,
                className: 'vex-theme-plain full-width',
                buttons: [
                    $.extend ({}, vex.dialog.buttons.NO, download_button),
                    vex.dialog.buttons.NO
                ],
                
                // As the content can be too long, we force vex to 
                // go to the top
                afterOpen: function () {
                    setTimeout (function () {
                        $('.vex')[0].scrollTo (0, 0);
                    },1)
                }
            });
            
        });
        
        
        // Remove loading state
        $('body').removeClass ('loading-state');
        
    }
    
    
    /**
     * toDataURL
     */
    var toDataURL = function (src, callback, outputFormat) {
        var img = new Image ();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
        };
        img.src = src;
        if (img.complete || img.complete === undefined) {
            img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            img.src = src;
        }
}

    
    
    // Return public API
    return {
        index: index
    }
}) ;
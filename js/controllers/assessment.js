/**
 * Assessment Controller
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/assessment.html',
    'text!templatePath/templates/assessment-item.html',
    'jquery', 
    'hogan',
    'config', 
    'db',
    'helpers',
    'i18n!nls/translations',
], function (tpl, tpl_assessment, $, hogan, config, db, helpers, i18n) {

    /**
     * index
     *
     * Entry point of the map perspective
     *
     * @package EssenceTool
     */
    var index = function (params) {
    
        /** @var wrapper DOM zero element */
        var wrapper = $('#wrapper');
        
        
        /** @var template TPL */
        var template = hogan.compile (tpl);
        var template_assessment = hogan.compile (tpl_assessment);
        
        
        /** @var template_params Object */
        var template_params = helpers.i18n_tpl ();
        
        
        // Render
        wrapper.html (template.render (template_params));
        
        
        /** @var assessment_ph jQuery Object */
        var assessment_ph = wrapper.find ('.assessment-ph');
        
        
        /** @var form jQuery Object */
        var form = wrapper.find ('[name="assessment-form"]');
        
        
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
                
                /** @var template_params Object */
                var template_params = helpers.i18n_tpl (assessment);
                
                
                // Append to the placeholder
                assessment_ph.append (template_assessment.render (template_params));
                
           });
        });
        
        
        // Handle events
        form.submit (function (e) {
            
            /** @var results Object */
            var results = {
                name: form.find ('[name="name"]').val (),
                email: form.find ('[name="email"]').val (),
                assessments: {}
            };
            
            
            // Validation of the form
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
            
            console.log (results);
            

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
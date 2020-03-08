/**
 * Helpers
 *
 * @package EssenceTool
 */

define ([
    'jquery', 
    'config', 
    'db',
    'i18n!nls/translations'
], function ($, config, db, i18n) {

    /**
     * populate_select
     *
     * @param select
     * @param object_store
     * @param selected_id int
     * @param i18n null|Object
     */
    var populate_select = function (select, object_store, selected_id, i18n) {
        
        // Populate projects
        db.getAll (object_store).then (function (items) {
            
            // Sort
            items.sort ((a, b) => a.name.localeCompare (b.name));
            
             
            // Attach information to the object
            if (selected_id) {
                items.find (x => x.id).is_selected = false;
                items.find (x => x.id === selected_id).is_selected = true;
            }
            
            
            // Iterate over the items
            $.each (items, function (index, item) {
                
                /** @var id int */
                var id = item.id;
                
                
                /** @var name String */
                var name = i18n && i18n[id] 
                    ? i18n[id].name 
                    : item.name
                ;
                
                
                select.append ($("<option />")
                    .attr ('value', id)
                    .prop ('selected', item.is_selected)
                    .text (name)
                );
            });
            
            
            // Render select2 field
            select.prop ('disabled', false).select2 ();
            
        });
    }
    
    
    /**
     * populate_select_group
     *
     * @param select
     * @param subgroup_ids int|Array
     */
    var populate_select_group = function (select, subgroup_ids) {
        
        // Check if the ID is an array or a simple element. This is 
        // valid when dealing when select multiple
        if (subgroup_ids && ! (subgroup_ids instanceof Array)) {
            subgroup_ids = [subgroup_ids];
        }
        
        
        // Return promise
        return new Promise ((resolve, reject) => {

            // Retrieve the groups
            db.getAllGroups ().then (function (groups) {
                
                // Iterate over each group
                $.each (groups, function (index, group) {
                
                    // Create a section within the select
                    select.append ($("<optgroup />").attr ('label', group.name));
                    
                    
                    // Set the is_selected item
                    $.each (group.subgroups, function (index, subgroup) {
                        subgroup.is_selected = subgroup_ids ? subgroup_ids.indexOf (subgroup.id) !== -1 : false;
                    });
                    
                    
                    // Iterate over the subgruoups
                    $.each (group.subgroups, function (index_subgroup, subgroup) {
                        select.find ('optgroup:last-child').append (
                            $("<option />")
                                .attr ('value', subgroup.id)
                                .prop ('selected', subgroup.is_selected)
                                .text (subgroup.name)
                        )
                    });
                });
                
                
                // Remove disable
                select.prop ('disabled', false).select2 ();
                
                
                // Notify end
                resolve ();
            
            });
        });
    }
    
    
    /**
     * i18n_tpl
     *
     * @param object
     */
    var i18n_tpl = function (object) {
        
        // If no object if provided, then create an object
        if ( ! object) {
            object = {};
        }
        
        
        // Attach to the object, the i18n variable
        object['i18n'] = function () {
            return function (text, render) {
                return ref (i18n, text);
            }
        };
        
        
        // Return the object
        return object;

    }
    
    
    /**
     * i18n_assessment
     *
     * This function i18ns an assesments
     *
     * @param assessment
     * @param i18n
     */
    var i18n_assessment = function (assessment, i18n) {
        
        // i18n of the question text of the fields
        assessment.name = i18n["name"];
        assessment.description = i18n["description"];
        
        
        // i18n of the feedbacks
        $.each (assessment.feedbacks, function (index_feedback, feedback) {
            feedback.text = i18n["feedbacks"][index_feedback];
        });
        
        
        // i18n of the questions and valorations
        $.each (assessment.questions, function (index_question, question) {
            
            // i18n of the question text
            question.text = i18n['questions'][index_question];
            
            
            // Create the fieldname for each valoration
            $.each (question.valorations, function (index_valoration, valoration) {
                valoration.text = i18n["valorations"][valoration.id];
            });
        });
    }
    
    
    
    /**
     * i18n_rubric
     *
     * This function i18ns a rubric
     *
     * @param rubric
     * @param i18n
     */
    var i18n_rubric = function (rubric, i18n) {
        
        // i18n of the question text of the fields
        rubric.name = i18n["name"];
        rubric.description = i18n["description"];
        
        
        // i18n of the valorations
        $.each (rubric.valorations, function (index_valoration, valoration) {
            valoration.text = i18n["valorations"][valoration.id];
        });
        
        
        // i18n of the rows
        $.each (rubric.rows, function (index_row, row) {
            
            // Update the name of row
            if (i18n["rows"][index_row]) {
                row.name = i18n["rows"][index_row];
            }
            
            
            // Update the cell values
            $.each (row.values, function (index_value, cell) {
                if (i18n["cells"][index_row][cell.id]) {
                    cell.text = i18n["cells"][index_row][cell.id];
                }
            });
            
        });

    }
    
    
    /**
     * interpolate
     *
     * @param message String
     * @param replacements Array
     */
    var interpolate = function (message, replacements) {
        return message.replace (/%\w+%/g, function (all) {
            return all in replacements ? replacements[all] : all;
        });
    }
    
    
    /**
     * download_file
     *
     * @see https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
     *
     * @param filename String
     * @param filename String
     */
    var download_file = function (filename, content) {
 
        // IE10 polyfill
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob (new Blob ([content], {
                type: 'text/plain'
            }), filename);
        
        // Regular browsers
        } else {

            /** @var element String */
            var element = document.createElement ('a');
            
            
            // Set attributes
            element.setAttribute ('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent (content));
            element.setAttribute ('download', filename);
            element.style.display = 'none';
            
            
            // Attach, download and remove
            document.body.appendChild (element);
            element.click ();

            document.body.removeChild (element);
        
        }
        
    }
    
    
    // Return public API
    return {
        populate_select: populate_select,
        populate_select_group: populate_select_group,
        i18n_tpl: i18n_tpl,
        i18n_assessment: i18n_assessment,
        i18n_rubric: i18n_rubric,
        interpolate: interpolate,
        download_file: download_file
    }
}) ;
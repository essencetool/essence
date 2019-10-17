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
     */
    var populate_select = function (select, object_store, selected_id) {
        
        // Populate projects
        db.getAll (object_store).then (function (items) {
            
            // Sort
            items.sort ((a, b) => a.name.localeCompare (b.name));
            
             
            // Attach information to the object
            if (selected_id) {
                items.find (x => x.id).is_selected = false;
                items.find (x => x.id === selected_id).is_selected = true;
            }
            
            
            // Iterate over the groups
            $.each (items, function (index, item) {
                select.append ($("<option />")
                    .attr ('value', item.id)
                    .attr ('selected', item.is_selected)
                    .text (item.name)
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
     * @param subgroup_id int
     */
    var populate_select_group = function (select, subgroup_id) {

        // Retrieve the groups
        db.getAllGroups ().then (function (groups) {
            
            // Iterate over each group
            $.each (groups, function (index, group) {
            
                // Create a section within the select
                select.append ($("<optgroup />").attr ('label', group.name));
                
                
                // Set the is_selected item
                $.each (group.subgroups, function (index, subgroup) {
                    subgroup.is_selected = subgroup_id ? subgroup.id == subgroup_id : false;
                });
                
                
                // Iterate over the subgruoups
                $.each (group.subgroups, function (index_subgroup, subgroup) {
                    select
                        .find ('optgroup:last-child')
                            .append ($("<option />")
                                .attr ('value', subgroup.id)
                                .attr ('selected', subgroup.is_selected)
                                .text (subgroup.name)
                            );
                });
                
            });

            select.prop ('disabled', false).select2 ();
            
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
    
    
    // Return public API
    return {
        populate_select: populate_select,
        populate_select_group: populate_select_group,
        i18n_tpl: i18n_tpl,
        interpolate: interpolate
    }
}) ;
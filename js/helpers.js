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
            
            // Get qll groups
            $.each (groups, function (index, group) {
            
                // Append the optgroup
                select.append ($("<optgroup />").attr ('label', group.name));
                
                
                // Get rubric
                if (subgroup_id) {
                    $.each (group.subgroups, function (index, subgroup) {
                        subgroup.is_selected = subgroup.id = subgroup_id;
                    });
                }
                
                
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
    
    
    // Return public API
    return {
        populate_select: populate_select,
        populate_select_group: populate_select_group
    }
}) ;
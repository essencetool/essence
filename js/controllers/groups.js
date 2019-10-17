/**
 * Group Controller
 *
 * @package EssenceTool
 */

define ([
    'text!templatePath/groups.html',
    'text!templatePath/templates/groups-row.html',
    'jquery', 
    'hogan',
    'config', 
    'db',
    'i18n!nls/translations'
], function (tpl, tpl_group_row, $, hogan, config, db, i18n) {

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
        
        
        /** @var template_group_row TPL */
        var template_group_row = hogan.compile (tpl_group_row);
        
        
        /** @var template_params Object */
        var template_params = {};
        template_params['i18n'] = function () {
            return function (text, render) {
                return ref (i18n, text);
            }
        };
        
        
        // Render
        wrapper.html (template.render (template_params));
        
        
        /** @var table DOM */
        var table = wrapper.find ('.groups-table-placeholder');
        
        
        // Populate projects
        db.getAllGroups ().then (function (groups) {
            $.each (groups, function (index, group) {
                
                // Attach the group to the template
                $.each (group.subgroups, function (index, subgroup) {
                   subgroup.group_id = group.id; 
                });
                
                
                /** @var template_params Object */
                var template_params = group;
                
                
                // Attach i18n
                template_params['i18n'] = function () {
                    return function (text, render) {
                        return ref (i18n, text);
                    }
                };
                
                
                // Render the group
                table.append (template_group_row.render (template_params));
                
            });
        });
        
        
        // Bind actions  
        // Create new project
        wrapper.find ('.create-group-action').click (function (e) {
            vex.dialog.prompt ({
                message: i18n.frontend.pages.groups.prompt.name_gruop,
                callback: function (name) {
                    
                    if ( ! name) {
                        return;
                    }
                    
                    
                    /** @var group Object */
                    var group = {
                        name: name,
                        slug: slugify (name)
                    }
                    
                    
                    // Add to the database
                    db.add ('groups', group, {callback: function () {
                        vex.dialog.alert (i18n.frontend.pages.groups.messages.duplicate_group);
                    }});
                    
                    
                    // Repopulate
                    index (params);
                    
                }
            });
        });
        
        
        // Create subgroup action
        table.on ('click', '.create-subgroup-action', function (e) {
        
            /** @var group_id String */
            var group_id = $(this).attr ('data-group') * 1;
            
            
            // Request information
            vex.dialog.prompt ({
                message: i18n.frontend.pages.groups.prompt.name_subgruop,
                callback: function (name) {
                    
                    // User cancel action or doesn't provide a valid name
                    if ( ! name) {
                        return;
                    }
                    
                    
                    /** @var subgroup Object */
                    var subgroup = {
                        name: name,
                        slug: slugify (name),
                        group_id: group_id,
                    }
                    
                    
                    // Add to the database
                    db.add ('subgroups', subgroup, {
                        callback: function () {
                            vex.dialog.alert (i18n.frontend.pages.groups.messages.duplicate_subgroup);
                        }
                    });
                    
                    
                    // Repopulate
                    index (params);
                    
                }
            });
        });
        
        
        // Bind modify parameters
        table.on ('click', '.modify-group-name-action, .modify-subgroup-name-action', function () {
            
            /** @var id int */
            var id = $(this).attr ('data-id') * 1;
            
            
            /** @var keobject_storey String */
            var object_store = $(this).is ('.modify-group-name-action') ? 'groups' : 'subgroups';
            
            
            // Get item
            db.getByID (object_store, id).then (function (item) {
                
                // No item was fetched from the database
                if ( ! item) {
                    return;
                }
                
                
                // Request the new name
                vex.dialog.prompt ({
                    message: "Please, type the new name",
                    value: item.name,
                    callback: function (value) {
                        
                        // User does not provide any name
                        if ( ! value) {
                            return;
                        }
                        
                        
                        // Update new information about the group/subgroup
                        item['name'] = value;
                        item['slug'] = slugify (value);
                        
                        
                        // Add to the database
                        db.put (object_store, item);
                        
                        
                        // Repopulate
                        index (params);
                        
                    }
                });
            });
        });
        
        
        /** 
         * Delete selected groups
         *
         * @todo. Check if there are students with these groups
         */
        table.on ('click', '.delete-group-action', function (e) {
            
            /** @var group_id int */
            var group_id = $(this).attr ('data-id') * 1;
            
            
            // Request user confirmation
            vex.dialog.confirm ({
                message: i18n.frontend.pages.groups.confirm.delete_groups,
                callback: function (confirm) {
                    
                    // Request user confirmation
                    if ( ! confirm) {
                        return;
                    }
                    
                    
                    // Delete the subgroups
                    db.getAllByKey ('subgroups', 'group_id', group_id).then (function (subgroups) {
                        $.each (subgroups, function (index, subgroup) {
                            db.deleteItems ('subgroups', subgroup.id);
                        });
                    });
                    
                    
                    // Delete group
                    db.deleteItems ('groups', group_id).then (function () {
                        index (params);
                    });
                    
                }
            });
        });
        
        
        // Delete subgroup action
        // @todo. Check if there are students with these groups
        table.on ('click', '.delete-subgroup-action', function (e) {
            
            /** @var subgroup_id int */
            var subgroup_id = $(this).attr ('data-id') * 1;
            
            
            // Request user confirmation
            vex.dialog.confirm ({
                message: i18n.frontend.pages.groups.confirm.delete_subgroups,
                callback: function (confirm) {
                    
                    // user has cancelled this
                    if ( ! confirm) {
                        return;
                    }
                    
                    
                    // Delete items
                    db.deleteItems ('subgroups', subgroup_id).then (function () {
                        index (params);
                    });
                    
                }
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
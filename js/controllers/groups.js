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
                   subgroup.group_slug = group.slug; 
                });
                
                
                /** @var template_params Object */
                var template_params = group;
                
                
                template_params['i18n'] = function () {
                    return function (text, render) {
                        return ref (i18n, text);
                    }
                };
                
                
                // Render the group
                table.append (template_group_row.render (group));
                
            });
        });
        
        
        // Bind actions
        // Bind delete group button
        table.on ('change', '[name="groups"][type="checkbox"]', function () {
            wrapper.find ('.delete-group-action')
                .prop ('disabled', ! table.find ('[name="groups"][type="checkbox"]:checked').length)
            ;
        });
        
        
        // Bind subgroup button
        table.on ('change', '[name="subgroups"][type="checkbox"]', function () {
            
            /** @var group_slug String */
            var group_slug = $(this).attr ('data-group');
            
            
            // Get the button
            wrapper
                .find ('.delete-subgroup-action')
                    .filter ('[data-group="' + group_slug + '"]')
                        .prop ('disabled', ! table.find ('[data-group="' + group_slug + '"][type="checkbox"]:checked').length)
            ;
        });
        
        
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
        
            /** @var group_slug String */
            var group_slug = $(this).attr ('data-group');
            
            
            // Request information
            vex.dialog.prompt ({
                message: i18n.frontend.pages.groups.prompt.name_subgruop,
                callback: function (name) {
                    
                    if ( ! name) {
                        return;
                    }
                    
                    /** @var subgroup Object */
                    var subgroup = {
                        name: name,
                        slug: slugify (name),
                        group_id: group_slug,
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
                
                if ( ! item) {
                    return;
                }
                
                vex.dialog.prompt ({
                    message: "Please, type the new name",
                    value: item.name,
                    callback: function (value) {
                        
                        if ( ! value) {
                            return;
                        }
                        
                        
                        /** @var item Object */
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
        
        
        // Delete selected groups
        wrapper.find ('.delete-group-action').click (function (e) {
            vex.dialog.confirm ({
                message: i18n.frontend.pages.groups.confirm.delete_groups,
                callback: function (confirm) {
                    
                    // Request user confirmation
                    if ( ! confirm) {
                        return;
                    }
                    
                    
                    // Get each selected subgroup
                    var ids = [];
                    wrapper.find ('[name="groups"]:checked').each (function () {
                        ids.push ($(this).attr ('data-id') * 1);
                    });
                    
                    
                    // @todo. Check if there are students with these groups
                    // 
                    
                    
                    // Delete items
                    db.delete_items ('groups', ids).then (function () {
                        
                        // @todo Delete orphan subgroups
                        
                        index (params);
                    });
                }
            });
        });
        
        
        // Delete subgroup action
        table.on ('click', '.delete-subgroup-action', function (e) {
            
            /** @var group_slug String */
            var group_slug = $(this).attr ('data-group');
            
            
            // Request user confirmation
            vex.dialog.confirm ({
                message: i18n.frontend.pages.groups.confirm.delete_subgroups,
                callback: function (confirm) {
                    
                    // user has cancelled this
                    if ( ! confirm) {
                        return;
                    }
                    
                    
                    // Get each selected subgroup
                    var ids = [];
                    wrapper.find ('[name="subgroups"][data-group="' + group_slug + '"]:checked').each (function () {
                        ids.push ($(this).attr ('data-id') * 1);
                    });
                    
                    
                    // @todo. Check if there are students with these groups
                    
                    
                    // Delete items
                    db.delete_items ('subgroups', ids).then (function () {
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
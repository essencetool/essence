/**
 * ProjectsController
 *
 * @package EssenceTool
 */

define ([
    'jquery', 
    'config', 
    'i18n!nls/translations',
    'json!assetsPath/projects.json',
    'json!assetsPath/groups.json',
    'json!assetsPath/students.json',
    'json!assetsPath/sample.json',
], function ($, config, i18n, projects, groups, students, rubrics) {
    
    /** @var db Here, we will store our database */
    var db;
    
    
    /** @var needs_populate Boolean Determine if the database has to be populated again */
    var needs_populate = false;
   
    
    /**
     * init
     */
    var init = function () {
        
        // Check compatibility
        if ( ! window.indexedDB) {
            vex.dialog.alert ("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
            return;
        }
        
        
        /** @var request indexedDB */
        var request = window.indexedDB.open ('essenceDB', 1);
        
        
        // Handle errors
        request.onerror = function (event) {
            vex.dialog.alert ("Database error: " + event.target.errorCode);
        };
        
        
        // Handle database updated. This event is only fired
        // when the 'onupgradeneeded' has taken placed
        request.onsuccess = function (event) {
            
            // Reference database
            db = event.target.result;
            
            
            // We have finish here
            if ( ! needs_populate) {
                return;
            }
            
            
            /** @var transaction Create a transaction for all the objects */
            var transaction = db.transaction (db.objectStoreNames, 'readwrite');
            
            
            // Bind error handling
            transaction.onerror = function (event) {
                vex.dialog.alert ("Database error: " + event.target.errorCode);
            };
            
            
            // Populate items
            $.each ({
                'projects': projects, 
                'groups': groups,
                'students': students,
                'rubrics': rubrics
            }, function (object_store, data) {
                var store = transaction.objectStore (object_store);
                data.forEach (function (item) {
                    store.add (item);
                });
            });
        };
        
        
        /**
         * onupgradeneeded
         *
         * Database creation scheme
         */
        request.onupgradeneeded = function (event) {
            
            // Save the IDBDatabase interface 
            var db = event.target.result;
            
            
            // Create an projects for this database
            var projectsStore = db.createObjectStore ('projects', {autoIncrement: true });
            var groupsStore = db.createObjectStore ('groups', {autoIncrement: true });
            var rubricsStore = db.createObjectStore ('rubrics', {autoIncrement: true });
            var studentsStore = db.createObjectStore ('students', {keyPath: 'id', autoIncrement: true });
            
            
            // Create alternate indexes
            studentsStore.createIndex ('id', 'id');
            studentsStore.createIndex ('group_id', 'group_id');
            
            
            // Set the flag to determine that the database has to be populated again
            needs_populate = true;
            
        };
    }
    
    
    /**
     * getAll
     *
     * @param object_store String
     * @param callback function
     *
     * Retrives items from a object store
     */
    var getAll = function (object_store, callback) {
        
        /** @var transaction Create a transaction for all the objects */
        var transaction = db.transaction (object_store);
        var store = transaction.objectStore (object_store);
        
        
        store.getAll ().onsuccess = function (event) {
            if (typeof callback === 'function') {
                callback (event.target.result);
            }
        };
    }
    
    
    /**
     * getByID
     *
     * Note that this function will retrieve items 
     * without being hidrated
     *
     * @param object_store String
     * @param id int
     * @param callback function
     *
     * Retrives item from a object store
     */
    var getByID = function (object_store, id, callback) {
        
        /** @var transaction Create a transaction for all the objects */
        var transaction = db.transaction (object_store);
        var store = transaction.objectStore (object_store);
        
        
        store.get (id).onsuccess = function (event) {
            if (typeof callback === 'function') {
                callback (event.target.result);
            }
        };
    }
    
    
    /**
     * getStudentById
     *
     * This function returns an hidrated student 
     * from its id.
     *
     * @param id int
     * @param callback function
     *
     * Retrives item from a object store
     */
    var getStudentById = function (id, callback) {
        
        /** @var identified_groups Array */
        var identified_groups = [];
        
        
        // Get student by ID
        getByID ('students', id, function (student) {
            
            /** @var callbacks int */
            var callbacks = student.group_id.length;
            
            
            // Defered
            var dfd = jQuery.Deferred ();
            
            
            // For each group
            if (callbacks > 0) $.each (student.group_id, function (index, group_id) {
                
                // Get all groups
                // @todo Index by subgroups
                getAll ('groups', function (groups) {
                    
                    // ITerate over all groups
                    $.each (groups, function (index_group, group) {
                        
                        // ITerate over subgroups
                        $.each (group.subgroups, function (index_subgroup, subgroup) {
                            
                            if (subgroup.id == group_id) {
                                
                                // Attach subgroup
                                identified_groups.push (subgroup);
                                
                                
                                // Update callbacks
                                callbacks--;
                                
                                if (callbacks === 0) {
                                    dfd.resolve ('hurray');
                                }

                                return false;
                            }
                            
                        });
                    });
                });
            });
            
            
            // When all the subgroups are done, run the callback
            $.when (dfd.promise ()).then (
                function () {
                    
                    // Update information of the user
                    student.group = pluck (identified_groups, 'name').join (', ');
                
                
                    // Run callback
                    callback (student) 
                }
            );
            
        });
    }
    
    
    // Return public API
    return {
        init: init,
        getAll: getAll,
        getByID: getByID,
        getStudentById: getStudentById
    }
}) ;
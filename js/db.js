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
    
    
    /** @var object_stores Boolean Determine if the database has to be populated again */
    var object_stores = [
        'projects',
        'groups',
        'rubrics',
        'students',
        'ratings'
    ];
   
    
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
            var ratingsStore = db.createObjectStore ('ratings', {
                keyPath: [
                    'project_id', 
                    'rubric_id', 
                    'student_id'
                ],
                unique: true
            });
            
            
            // Create alternate indexes
            studentsStore.createIndex ('id', 'id');
            studentsStore.createIndex ('email', 'email', { unique: true });
            ratingsStore.createIndex ('project_id', 'project_id');
            ratingsStore.createIndex ('student_id', 'student_id');
            ratingsStore.createIndex ('rubric_id', 'rubric_id');
            
            
            
            // Set the flag to determine that the database has to be populated again
            needs_populate = true;
            
        };
    }
    
    
    /**
     * getAll
     *
     * @param object_store String
     *
     * Retrives items from a object store
     */
    var getAll = function (object_store) {
        
        // Return promise
        return new Promise ((resolve, reject) => {
            
            /** @var result Array */
            var result = [];
            
            
            /** @var transaction Transaction in read only */
            var transaction = db.transaction (object_store, 'readonly');
            
            
            /** @var store objectStore */
            var store = transaction.objectStore (object_store);
            
            
            // Open cursor and iterate
            store.openCursor ().onsuccess = function (event) {
                
                /** var cursor Cursor */
                var cursor = event.target.result;
                
                
                // While we are receicing items, we iterate with the cursor
                if (cursor) {
                    result.push (cursor.value);
                    cursor.continue ();
                    
                // When cursor ends, resolve our promise
                } else {
                    resolve (result);
                }
                
            };
        });
    }
    
    
    /**
     * getAllKeys
     *
     * @param object_store String
     *
     * Retrives items from a object store
     */
    var getAllKeys = function  (object_store) {
        
        // Return promise
        return new Promise ((resolve, reject) => {
            
            /** @var result Array */
            var result = [];
            
            
            /** @var transaction Transaction in read only */
            var transaction = db.transaction (object_store, 'readonly');
            
            
            /** @var store objectStore */
            var store = transaction.objectStore (object_store);
            
            
            /** @var store objectStore */
            store.getAllKeys ().onsuccess = function (event) {
                resolve (event.target.result);
            }
        });
    }
    
    
    /**
     * put
     *
     * Note that this function will retrieve items 
     * without being hidrated
     *
     * @param object_store String
     * @param object Object
     *
     */
    var put = function (object_store, object) {
        
        /** @var transaction Create a transaction for all the objects */
        var transaction = db.transaction (object_store, 'readwrite');
        var store = transaction.objectStore (object_store);
        
        
        // Modify the element in the store
        store.put (object);

    }    
    
    /**
     * add
     *
     * Note that this function will retrieve items 
     * without being hidrated
     *
     * @param object_store String
     * @param object Object
     *
     */
    var add = function (object_store, object, on_duplicate) {
        
        /** @var transaction Create a transaction for all the objects */
        var transaction = db.transaction (object_store, 'readwrite');
        var store = transaction.objectStore (object_store);
        
        
        // Add the element in the store
        store.add (object);
        
        
        // On duplicate...
        transaction.onerror = function (event) {
            
            if ( ! typeof on_duplicate.callback == 'function') {
                return;
            }
            
            db.transaction (object_store)
                .objectStore (object_store)
                    .index (on_duplicate.key)
                        .get (object.email)
                            .onsuccess = function (event) {
                                
                                // Get the object that causes the duplicate item
                                object = event.target.result;

                                
                                 // Get modified object
                                object = on_duplicate.callback (object);
                                
                                
                                /** @var transaction Create a transaction for all the objects */
                                var transaction = db.transaction (object_store, 'readwrite');
                                var store = transaction.objectStore (object_store);
                                store.put (object);

                            }
            ;
            
        }
    }
    
    
    /**
     * getByID
     *
     * Note that this function will retrieve items 
     * without being hidrated
     *
     * @param object_store String
     * @param id int
     *
     * Retrives item from a object store
     */
    var getByID = function (object_store, id) {
        
        // Return promise
        return new Promise ((resolve, reject) => {
            
            /** @var result Array */
            var result = {};
            
            
            /** @var transaction Create a transaction for all the objects */
            var transaction = db.transaction (db.objectStoreNames, 'readwrite');
            
            
            /** @var object */
            var store = transaction.objectStore (object_store);
            
        
            // Bind error handling
            transaction.onerror = function (event) {
                vex.dialog.alert ("Database error: " + event.target.errorCode);
            };
            
            
            store.get (id).onsuccess = function (event) {
                resolve (event.target.result);
            };
        });
    }
    
    
   /**
     * getRatingById
     *
     * Note that this function will retrieve rubric by its composite key
     *
     * @param id int
     * @param callback function
     *
     * Retrives item from a object store
     */
    var getRatingById = function (id, callback) {
        
        /** @var transaction Create a transaction for all the objects */
        var transaction = db.transaction ('ratings');
        var store = transaction.objectStore ('ratings');
        
        
        store.get (id)
            .onsuccess = function (event) {
                if (typeof callback === 'function') {
                    callback (event.target.result);
                }
            }
        ;
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
    var getStudentById = function (id) {
        
        return new Promise ((resolve, reject) => {
        
            // Get student by ID
            getByID ('students', id).then (function (student) {
                
                // Attach photo if the student hasn't any
                if ( ! student.photo) {
                    student.photo = "img/student.png";
                }
                
                
                // Hidrate groups
                student.groups = [];
                student.ratings = [];
                
                
                /** @var transaction Create a transaction for all the objects */
                db.transaction ('ratings')
                    .objectStore ('ratings')
                    .index ('student_id')
                    .openCursor (IDBKeyRange.only (student.id)).onsuccess = function (event) {
                        
                        // Get cursor
                        var cursor = event.target.result;
            
            
                        // If we have an element
                        if (cursor) {
                            
                            // Attacg
                            student.ratings.push (cursor.value);
                        
                        
                            // Go no next item
                            cursor.continue ();
                        }
                    }
                ;

            
                /** @var callbacks int */
                var callbacks = student.group_id.length;
                
                
                // Get subgroups
                if ( ! callbacks)  {
                    resolve (student);
                }
                
            
                // For each group
                if (callbacks > 0) $.each (student.group_id, function (index, group_id) {
                
                    // Get all groups. @todo Index by subgroups
                    getAll ('groups').then (function (groups) {
                    
                        // ITerate over all groups
                        $.each (groups, function (index_group, group) {
                        
                            // ITerate over subgroups
                            $.each (group.subgroups, function (index_subgroup, subgroup) {
                            
                                if (subgroup.id == group_id) {
                                
                                    // Attach subgroup
                                    student.groups.push (subgroup);
                                
                                
                                    // Update callbacks
                                    callbacks--;
                                
                                    if (callbacks === 0) {
                                        resolve (student);
                                    }

                                    return false;
                                }
                            });
                        });
                    });
                });
            });
        });
    }
    
    
    
    
    /**
     * getAllStudents
     *
     */
    var getAllStudents = function () {
        
        // Return promise
        return new Promise ((resolve, reject) => {
            
            /** @var response Array */
            var response = [];
            
            
            // Retrieve all student objects plain
            getAllKeys ('students').then (function (ids) {
            
                /** @var callbacks int To know when every object is full */
                var callbacks = students.length;
                
                
                // Get each plain object
                $.each (ids, function (index, student_id) {
                    getStudentById (student_id).then (function (student) {
                        response.push (student);
                        callbacks--;
                   
                        if ( ! callbacks) {
                            resolve (response);
                        }
                    });
                });
            });
        });
    }
    
    
    /**
     * getAllGroups
     *
     * @param callback function
     */
    var getAllGroups = function () {
        return getAll ('groups');
    }
    
    
    /** 
     * getAllItems
     */
    var getAllItems = function (callback) {
        
        // Return promise
        return new Promise ((resolve, reject) => {
            
            /** @var result Array */
            var result = {};
            
            
            /** @var countdown int */
            var countdown = object_stores.length;
            
            
            /** @var transaction Create a transaction for all the objects */
            var transaction = db.transaction (db.objectStoreNames, 'readwrite');
            
        
            // Bind error handling
            transaction.onerror = function (event) {
                vex.dialog.alert ("Database error: " + event.target.errorCode);
            };
            
            
            // Get each object store
            $.each (object_stores, function (index, object_store) {
                
                /** @var store */
                var store = transaction.objectStore (object_store);
                
                
                // Create storage
                result[object_store] = [];
                    
                
                // Iterate
                store.openCursor ().onsuccess = function (event) {
            
                    // Get cursor
                    var cursor = event.target.result;
            
            
                    // If we have an element
                    if (cursor) {
                            
                        result[object_store].push (cursor.value);
                        
                        
                        // Go no next item
                        cursor.continue ();
                    
                    } else {
                        
                        countdown--;
                        if ( ! countdown) {
                            resolve (result);
                        }
                        
                    }
                }
            });
        });
    }

    
    
    // Return public API
    return {
        init: init,
        
        object_stores: object_stores,
        
        add: add,
        put: put,
        getAll: getAll,
        getAllKeys: getAllKeys,
        getByID: getByID,
        getStudentById: getStudentById,
        getRatingById: getRatingById,
        getAllStudents: getAllStudents,
        getAllGroups: getAllGroups,
        getAllItems: getAllItems,
    }
}) ;
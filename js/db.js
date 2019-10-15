/**
 * DB and model functionality
 *
 * @package EssenceTool
 */

define ([
    'jquery', 
    'config', 
    'i18n!nls/translations',
    'json!assetsPath/projects.json',
    'json!assetsPath/groups.json',
    'json!assetsPath/sample.json',
], function ($, config, i18n, projects, groups, rubrics) {
    
    /** @var db Here, we will store our database */
    var db;
    
    
    /** @var needs_populate Boolean Determine if the database has to be populated again */
    var needs_populate = false;
    
    
    /** @var object_stores Boolean Determine if the database has to be populated again */
    var object_stores = [
        'projects',
        'groups',
        'subgroups',
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
                'rubrics': rubrics
            }, function (object_store, data) {
                var store = transaction.objectStore (object_store);
                data.forEach (function (item) {
                    store.add (item);
                });
            });
            
            
            // Populate groups
            var store_group = transaction.objectStore ('groups');
            var store_subgroup = transaction.objectStore ('subgroups');
            
            $.each (groups, function (index, group) {
                
                /** @var slug String */
                var slug = slugify (group.name);
                
                
                // Crate group
                store_group.add ({
                    name: group.name,
                    slug: slug,
                    key: group.key
                }).onsuccess = function (e) {
                    
                    var group_id = e.target.result;
                    
                    // Create subgroup
                    $.each (group.subgroups, function (index2, subgroup) {
                        store_subgroup.add ({
                            name: subgroup.name,
                            slug: slugify (subgroup.name),
                            group_id: group_id,
                        });
                    });

                };
                
                
            });
        };
        
        
        /**
         * onupgradeneeded
         *
         * Database creation scheme
         */
        request.onupgradeneeded = function (event) {
            
            /** @var db Object */
            var db = event.target.result;
            
            
            /** @var default_values Object */
            var default_properties = {
                keyPath: 'id',
                autoIncrement: true 
            };
            
            
            // Create the object stores for this database
            // Projects
            db.createObjectStore ('projects', default_properties);
            
            
            // Groups and subgroups
            db.createObjectStore ('groups', default_properties)
                .createIndex ('slug', 'slug', { unique: true })
            ;
            
            var subgroup_object_store = db.createObjectStore ('subgroups', default_properties);
            subgroup_object_store.createIndex ('group_id', 'group_id');
            subgroup_object_store.createIndex ('slug', 'slug', { unique: true });
            
            
            // Rubrics
            db.createObjectStore ('rubrics', default_properties);
            
            
            // Students
            var student_object_store = db.createObjectStore ('students', default_properties);
            student_object_store.createIndex ('id', 'id')
            student_object_store.createIndex ('email', 'email', { unique: true });
            
            
            // Ratings
            var ratings_object_store = db.createObjectStore ('ratings', default_properties);
            ratings_object_store.createIndex ('unique', [
                'created',
                'project_id', 
                'rubric_id', 
                'student_id'
            ], { unique: true })
            ratings_object_store.createIndex ('project_id', 'project_id')
            ratings_object_store.createIndex ('student_id', 'student_id')
            ratings_object_store.createIndex ('rubric_id', 'rubric_id')
            ratings_object_store.createIndex ('created', 'created', {unique:false});


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
     * getAllByKey
     *
     * Get all elements that match an specific key value
     *
     * @param object_store String
     * @param index String 
     * @param value 
     *
     * Retrives items from a object store
     */
    var getAllByKey = function (object_store, index, value) {

        // Return promise
        return new Promise ((resolve, reject) => {
            
            /** @var result Array */
            var result = [];
            
            
            /** @var transaction Transaction in read only */
            var transaction = db.transaction (object_store, 'readonly');
            
            
            /** @var store objectStore */
            var store = transaction.objectStore (object_store).index (index);
            
            
            /** @var filter IDBKeyRange Create the filter */
            var filter = IDBKeyRange.only (value);
            
            
            // Open cursor and iterate
            store.openCursor (filter).onsuccess = function (event) {
                
                /** var cursor Cursor */
                var cursor = event.target.result;
                
                
                // While we are receicing items, we iterate with the cursor
                if (cursor) {
                    result.push (cursor.value);
                    cursor.continue ();
                    
                // When cursor ends, resolve our promise
                } else {
                    
                    if (result.length != 0) {
                        resolve (result);
                    }
                    resolve ();
                    
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
     * delete_item
     *
     * Delete item
     *
     * @param object_store String
     * @param key Object
     */
    var delete_item = function (object_store, key) {
        
        // Return promise
        return new Promise ((resolve, reject) => {
        
            /** @var transaction Create a transaction for all the objects */
            var transaction = db.transaction (object_store, 'readwrite');
            var store = transaction.objectStore (object_store);
            
            
            // Modify the element in the store
            store.delete (key)
                .onsuccess = function () {
                    resolve ();
                }
            ;
            
        });
    }
    
    
    /**
     * delete_items
     *
     * Delete item
     *
     * @param object_store String
     * @param key Object
     */
    var delete_items = function (object_store, keys) {
        
        // Return promise
        return new Promise ((resolve, reject) => {
            
            /** @var callbacks int */
            var callbacks = keys.length;
            
            
            // Delete item 
            $.each (keys, function (index, key) {
                delete_item (object_store, key).then (function () {
                    callbacks--;
                    
                    if ( ! callbacks) {
                        resolve ();
                    }
                });
            });
        });
        
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
            
            // No callback supplied. Nothing to do here
            if ( ! typeof on_duplicate.callback == 'function') {
                return;
            }
            
            
            // Callback supplied, but no id
            if (typeof on_duplicate.callback == 'function' && ! on_duplicate.key) {
                on_duplicate.callback ();
                return;
            }
            
            
            // Callback and id supplied. 
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
            
            /** @var transaction Create a transaction for all the objects */
            var transaction = db.transaction (object_store);
            
            
            /** @var object */
            var store = transaction.objectStore (object_store);
            
        
            // Bind error handling
            transaction.onerror = function (event) {
                vex.dialog.alert ("Database error: " + event.target.errorCode);
            };
            
            
            // Bind on success action
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
     *
     * Retrives item from a object store
     */
    var getRatingById = function (id) {
        return getByID ('ratings', id);
    }
    
    
   /**
     * getLastRatingById
     *
     * Get the last rating from a triplet student, project, rubric
     *
     * @param student_id int
     * @param rubric_id int
     *
     * @todo Try to use complex indexes
     * @todo Get the last item by time
     * @todo Add project to the filter
     */
    var getLastRatingById = function (student_id, rubric_id) {
        
        return new Promise ((resolve, reject) => {
            
            getAllByKey ('ratings', 'student_id', student_id).then (function (ratings) {
                $.each (ratings, function (index, rating) {
                    if (rating.rubric_id == rubric_id) {
                        resolve (rating);
                        return false;
                    }
                });
            });
        });
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
                
                // No student
                if ( ! student) {
                    reject ();
                    return;
                }
                
                
                // Attach photo if the student hasn't any
                if ( ! student.photo) {
                    student.photo = "img/student.png";
                }
                
                
                // Hidrate groups
                student._ratings = [];
                student._groups = [];
                
                
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
                            student._ratings.push (cursor.value);
                        
                        
                            // Go no next item
                            cursor.continue ();
                        }
                    }
                ;

            
                /** @var callbacks int */
                var callbacks = student.groups.length;
                
                
                // Get subgroups
                if ( ! callbacks)  {
                    resolve (student);
                }
                
            
                // For each group
                if (callbacks > 0) $.each (student.groups, function (index, subgroup_id) {
                
                    // Get all groups. @todo Index by subgroups
                    getAll ('subgroups').then (function (subgroups) {
                        
                        // ITerate over subgroups
                        $.each (subgroups, function (index_subgroup, subgroup) {
                            
                            if (subgroup.id == subgroup_id) {
                                
                                // Attach subgroup
                                student._groups.push (subgroup);
                                
                                
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
    }
    
    
    /**
     * getAllStudents
     *
     * Retrieves all the students of the system
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
                var callbacks = ids.length;
                
                
                // Get each plain object
                $.each (ids, function (index, student_id) {
                    getStudentById (student_id).then (function (student) {
                        response.push (student);
                        callbacks--;
                   
                        if ( ! callbacks) {
                            resolve (response.sort ((a,b) => a.name.localeCompare (b.name)));
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
        
        // Return promise
        return new Promise ((resolve, reject) => {
            
            /** @var response Array */
            var response = [];
            
            
            // Retrieve all student objects plain
            getAll ('groups').then (function (groups) {
            
                /** @var callbacks int To know when every object is full */
                var callbacks = groups.length;
                
                
                // Get each plain object
                $.each (groups, function (index, group) {
                    
                    // Get all of the subgroups that belong to this group
                    getAllByKey ('subgroups', 'group_id', group.id).then (function (subgroups) {
                        group.subgroups = subgroups;
                        response.push (group);
                        callbacks--;
                   
                        if ( ! callbacks) {
                            resolve (response.sort ((a,b) => a.name.localeCompare (b.name)));
                        } 
                    });
                });
            });
        });
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
        delete_item: delete_item, 
        delete_items: delete_items,
        
        getAll: getAll,
        getAllByKey: getAllByKey, 
        getAllKeys: getAllKeys,
        getByID: getByID,
        getStudentById: getStudentById,
        getRatingById: getRatingById,
        getAllStudents: getAllStudents,
        getAllGroups: getAllGroups,
        getAllItems: getAllItems,
        getLastRatingById: getLastRatingById
    }
}) ;
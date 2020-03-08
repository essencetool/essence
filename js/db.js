/**
 * DB and model functionality
 *
 * @package EssenceTool
 */

define ([
    'jquery', 
    'config', 
    'i18n!nls/translations',

], function ($, config, i18n) {
    
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
        'ratings',
        'assessments'
    ];
   
    
    /**
     * init
     */
    var init = function () {
        
        // Return promise
        return new Promise ((resolve, reject) => {
        
            // Check compatibility
            if ( ! window.indexedDB) {
                reject (i18n.common.message.indexed_db_not_supported);
                return false;
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
                    resolve ();
                    return;
                }
                
                
                // Restore backup
                require (['json!assetsPath/initial-database.json'], function (backup) {
                    restore_backup (backup).then (function () {
                        resolve ();
                    });
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
                
                
                // Assessments
                db.createObjectStore ('assessments', default_properties)
                    .createIndex ('rubric_id', 'rubric_id', { unique: true })
                ;
                
                
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
                student_object_store.createIndex ('identifier', 'identifier', { unique: true });
                
                
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
        });
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
            
            
            // Get all items
            store.getAllKeys ().onsuccess = function (event) {
                resolve (event.target.result);
            }
        });
    }
    
    
    /**
     * updateItem
     *
     * @param object_store String
     * @param object Object
     */
    var updateItem = function (object_store, object) {
        
        // Return promise
        return new Promise ((resolve, reject) => {
        
            /** @var transaction Create a transaction for all the objects */
            var transaction = db.transaction (object_store, 'readwrite');
            
            
            /** @var store objectStore */
            var store = transaction.objectStore (object_store);
            
            
            // Bind the transaction
            transaction.oncomplete = function () {
                resolve ();
            }
            
            
            // Modify the element in the store
            store.put (object);
            
        });
    }
    
    
    /**
     * deleteItems
     *
     * Allows to delete a collection of items
     *
     * @param object_store String
     * @param ids String|Array of keys
     */
    var deleteItems = function (object_store, ids) {
        
        // Set the key as an array
        if ( ! Array.isArray (ids)) {
            ids = [ids];
        }
        
        
        // Return promise
        return new Promise ((resolve, reject) => {
        
            /** @var transaction Create a transaction for all the objects */
            var transaction = db.transaction (object_store, 'readwrite');
            
            
            /** @var store objectStore */
            var store = transaction.objectStore (object_store);
            
            
            // All work is done
            transaction.oncomplete = function () {
                resolve ();
            }
            
            
            // Reject transaction
            transaction.onerror = function (e) {
                reject (e);
            }
            
            
            // Delete item
            for (const id of ids) {
                store.delete (id);
            }
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
        
        
        /** @var store objectStore */
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
     * addItems
     *
     * This function allows to store multiple items in the database 
     * at once
     *
     * This function uses the "add" method and ensures that all the 
     * duplicated elements are returned in the callback. This action
     * could be used to insert again
     *
     * @param object_store String 
     * @param items Array
     * @param key String
     */
    var addItems = function (object_store, items, key) {
        
        // Set the key
        if ( ! key) {
            key = 'id';
        }
        
        
        // Return promise
        return new Promise ((resolve, reject) => {
            
            /** @var transaction Create a transaction for all the objects */
            var transaction = db.transaction (object_store, 'readwrite');
            
            
            /** @var store objectStore */
            var store = transaction.objectStore (object_store);
            
            
            /** @var i int */
            var i = 0;
            
            
            /** @var duplicated_items Array */
            var duplicated_items = [];
            
            
            /** @var private_callback function */
            var private_callback = function () {
                
                // Check there are still items to check
                if (i < items.length) {
                    
                    // If the item has the key we are asking for...
                    if (items[i][key]) {
                        
                        // We want to ensure that the item does not exists on the db
                        store.index (key).get (items[i][key]).onsuccess = function (e) {
                            
                            // Attach to the duplicated items
                            if (e.target.result) {
                                duplicated_items.push (e.target.result);
                                ++i;
                                private_callback ();
                            } else {
                                store.add (items[i]).onsuccess = private_callback;
                                ++i;
                            }
                        };
                        
                    // If the item does not have the key
                    } else {
                        store.index ('id').add (items[i]).onsuccess = private_callback;
                        ++i;
                    }
                } else {
                    resolve (duplicated_items);
                }
            }
            
            
            // Bind complete action
            transaction.oncomplete = function () {
                resolve (duplicated_items);
            };
            
            
            // Transaction error
            transaction.onerror = function (e) {
                reject (e);

            }
            
            
            // Add the element in the store
            private_callback ();
            
        });
    }
    
    
    
    /**
     * updateItems
     *
     * @param object_store String 
     * @param items Array
     */
    var updateItems = function (object_store, items) {
        
        // Return promise
        return new Promise ((resolve, reject) => {
            
            /** @var transaction Create a transaction for all the objects */
            var transaction = db.transaction (object_store, 'readwrite');
            
            
            /** @var store objectStore */
            var store = transaction.objectStore (object_store);
            
            
            /** @var i int */
            var i = 0;
            
            
            /** @var private_callback function */
            var private_callback = function () {
                
                // Check there are still items to check
                if (i < items.length) {
                    
                    store.put (items[i]).onsuccess = private_callback;
                    ++i;

                } else {
                    resolve ();
                }
            }
            
            
            // Bind complete action
            transaction.oncomplete = function () {
                resolve ();
            };
            
            
            // Transaction error
            transaction.onerror = function (e) {
                reject (e);
            }
            
            
            // Add the element in the store
            private_callback ();
            
        });
    }
    
    
    /**
     * getByID
     *
     * Note that this function will retrieve items 
     * without being hidrated
     *
     * @param object_store String
     * @param key int|string
     *
     * Retrives item from a object store
     */
    var getByID = function (object_store, key) {
        
        // Return promise
        return new Promise ((resolve, reject) => {
            
            // Check if it a valid key. If it not, return nothing
            if ( ! key) {
                resolve ();
            }
            
            
            /** @var transaction Create a transaction for all the objects */
            var transaction = db.transaction (object_store);
            
            
            /** @var store objectStore */
            var store = transaction.objectStore (object_store);
            
        
            // Bind error handling
            transaction.onerror = function (event) {
                vex.dialog.alert ("Database error: " + event.target.errorCode);
            };
            
            
            // Retrieve by key
            store.get (key).onsuccess = function (event) {
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

                // No student? Resolve as the same way as "getById" does
                if ( ! student) {
                    resolve ();
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

                                
                                if ( ! callbacks) {
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
                
                /** @var store objectStore */
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
    
    
    /**
     * truncate
     *
     * Truncate all the object names of the database
     *
     * @package EssenceTool
     */
    var truncate = function () {
        
        return new Promise ((resolve, reject) => {
            
            /** @var transaction Create a transaction for all the objects */
            var transaction = db.transaction (db.objectStoreNames, 'readwrite');
            
            
            // Bind error handling
            transaction.onerror = function (event) {
                reject ('Database error: ' + event.target.error.message);
            };
            
            
            // Bind success handling
            transaction.oncomplete = function () {
                resolve ();
            }
            
            
            // Get each object store
            $.each (object_stores, function (index, object_store) {
                
                /** @var store objectStore */
                var store = transaction.objectStore (object_store);
                
                
                /** @var clear_request objectStore */
                var clear_request = store.clear ();
                
                
                // Truncate
                clear_request.onsuccess = function (event) {
                    
                }
            });
        });
    }
    
    
    
    /**
     * restore_backup
     *
     * @param backup JSON
     */
    var restore_backup = function (backup) {
        
        return new Promise ((resolve, reject) => {
        
            /** @var transaction Create a transaction for all the objects */
            var transaction = db.transaction (db.objectStoreNames, 'readwrite');
    
    
            // Bind error handling
            transaction.onerror = function (event) {
                console.log (event);
                reject ('Database error: ' + event.target.error.message);
            };
    
    
            // Bind success handling
            transaction.oncomplete = function () {
                resolve ();
            }
            
            
            // Populate projects, rubrics, and assesments
            $.each (object_stores, function (index, object_store) {
                
                /** @var store objectStore */
                var data = backup[object_store];
                
                
                /** @var store objectStore */
                var store = transaction.objectStore (object_store);
                
                
                // Insert items
                data.forEach (function (item) {
                    store.add (item);
                });
            });
        });
    }
    
    
    /**
     * remove_db
     *
     * @param backup JSON
     */    
    var remove_db = function () {
        
        return new Promise ((resolve, reject) => {
        
            var req = window.indexedDB.deleteDatabase ('essenceDB');
            req.onsuccess = function () {
                resolve ();
            };

            req.onerror = function () {
                reject ("Couldn't delete database");
            };

            req.onblocked = function () {
                reject ("Couldn't delete database due to the operation being blocked");
            };

        });
        
    }
    
    
    // Return public API
    return {
        init: init,
        remove_db: remove_db,
        
        object_stores: object_stores,
        
        restore_backup: restore_backup,
        truncate: truncate,
        
        add: add,
        addItems: addItems,
        updateItem: updateItem,
        updateItems: updateItems,
        deleteItems: deleteItems,
        
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
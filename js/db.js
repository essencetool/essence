/**
 * ProjectsController
 *
 * @package EssenceTool
 */

define ([
    'jquery', 
    'config', 
    'i18n!nls/translations',
], function ($, config) {
    
    /** @var db */
    var db;
   
    
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
        var request = window.indexedDB.open ("essenceDB", 1);
        
        
        request.onerror = function (event) {
            vex.dialog.alert ("Database error: " + event.target.errorCode);
        };
        
        
        request.onsuccess = function (event) {
            db = event.target.result;    
        };
        
        
        request.onupgradeneeded = function(event) {
            
            // Save the IDBDatabase interface 
            var db = event.target.result;
            
            
            const projects_data = [
                {name: "Project Lorem Ipsum", "description": "Lorem ipsum"},
            ];
            
            
            // Create an projects for this database
            var projectsStore = db.createObjectStore ("projects", {autoIncrement: true });
            projectsStore.createIndex ("name", "name", { unique: false });
            projectsStore.createIndex ("description", "description", { unique: false });
            
            
            // Use transaction oncomplete to make sure the projectsStore creation is 
            // finished before adding data into it.
            projectsStore.transaction.oncomplete = function (event) {     
                var projectObjectStore = db.transaction ("projects", "readwrite").objectStore ("projects");
                projects_data.forEach (function (project) {
                    projectObjectStore.add (project);
                });
            }
        };
        
    }

    
    
    // Return public API
    return {
        init: init
    }
}) ;
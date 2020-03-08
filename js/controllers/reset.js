/**
 * Reset
 *
 * Performs a reset of the database allowing to load the initial database
 * version of the database
 *
 * @package EssenceTool
 */

define ([
    'jquery', 
    'config', 
    'db',
    'helpers',
    'i18n!nls/translations',
    'json!assetsPath/initial-database.json'
    
], function ($, config, db, helpers, i18n, backup) {

    /**
     * index
     *
     * @package EssenceTool
     */
    var index = function (params) {
        db.truncate ().then (function () {
            db.restore_backup (backup).then (function () {
                window.location = '#rate';
                window.location.reload ();
            })
        })
    } 
    
    
    // Return public API
    return {
        index: index
    }
}) ;
/**
 * Override require.js handling errors
 * 
 * With this function we can control the modules that could not be
 * loaded from the network. This is important for external modules
 * like Google MAPs API, ...
 */

requirejs.onError = function (err) {
    if (err.requireType === 'timeout') {
        console.log ('modules: ' + err.requireModules);
        alert ('There is a timeout error and the application can not continue');
    }
    
    
    // Let's the error escape
    throw err;
};


 // Require configuration
require.config ({
    
    // For deployment
    /** @link http://requirejs.org/docs/api.html#config-urlArgs */
    urlArgs: function (id, url) {
        
        // By default, args it will be a datetime to avoid cache
        var args = (new Date()).getTime();
        
        
        // If the URL contains google JSAPI, then remove it
        if (url.indexOf ('jsapi') !== -1) {
            args = '';
        }
        
        
        // Return URL
        return (url.indexOf('?') === -1 ? '?' : '&') + args;
    
    },
    
    
    // Paths
    paths: {
        
        // Templates
        'templatePath': '../templates',
        
        
        // CSSPaths
        'cssPath': '../css',
        
        
        // Hogan template system
        'hogan': 'vendor/hogan.min',
        
        
        // JQuery
        'jquery': 'vendor/jquery-3.4.1.min',
        
    },
    
    
    // Dependencies
    shim: {
        'jquery-ui': {
            exports: '$',
            deps: ['jquery']
        }
    }
});


/**
 * App
 * 
 * Start application
 * 
 * @package EssenceTool
 */
 
require (['jquery', 'config', 'i18n!nls/translations'], function ($, config, i18n) {
    
    // Update cancel
    vex.dialog.buttons.NO.text = i18n.vex.cancel;
    
    
    /**
     * Main controller
     *
     * The main controller handles to delegate on controllers according to the
     * hash
     *
     * @package EssenceTool
     */

    var main_controller = function () {
        
        // Take parameters
        var hash = getHash ();
        var params = getParams ();
        

        
        // The user has a token already
        if (localStorage.token && config.protected_controllers.indexOf (hash) > -1) {
            
            // Renew token
            api.get ('renew-token', {}, function (r) {
                if (r.ok) {
                    
                    // Keep a new copy of the renewd token
                    localStorage.token = r.data.token;
                    
                    
                    // Call the controller according to the hash
                    route_handler (hash, params);
                    
                } else {
                    
                    // Notify user and redirect to logout
                    vex.dialog.alert ({
                        message: r.data.message,
                        callback: function () {
                            window.location.hash = 'logout';
                        }
                    });
                }
                
            // Error handling
            }, function (r) {
                window.location.hash = 'logout';
            });
        }
        
        
        // The user has a token already but it is accessing a public part
        if (localStorage.token && config.protected_controllers.indexOf (hash) == -1) {
            route_handler (hash, params);
        }
        
        
        
        // Basic credentials checking. In this step, we only 
        // check in the client that the credentials exists
        // to notifiy soon to the client and redirect it 
        // to the login page
        if ( ! localStorage.token) {
            
            // Blacklist
            if (config.protected_controllers.indexOf (hash) > -1) {
                
                // Notify user and redirect to logout
                vex.dialog.alert ({
                    message: i18n.common.message.controller_not_allowed,
                    callback: function () {
                        window.location.hash = 'logout';
                    }
                });
                
            } else {
                
                // Call the controller according to the hash
                route_handler (hash, params);

            }
        }
    }
    
    
    /**
     * route_handler
     *
     * @param hash
     * @param params Array
     *
     * @package AllergyLESS
     */
    var route_handler = function (hash, params) {
    
        // Routes. According to the hash call individual controllers
        switch (hash) {

            // Set locale
            case '':
            case 'rate':
                break;
            
            case 'set-locale':
                localStorage.setItem ('locale', params[1]) ;
                window.location = '#map' ;
                window.location.reload () ;
                break;

            default:
                vex.dialog.alert ('@todo: ' + hash);
                break;                
                
        }
    }


    
    
    // Handle redirections. Each time the hash changes, we need
    // to perform a call to the main controller to decide in which
    // controller has to delegate to.
    if (Modernizr.hashchange) {
        $(window).on ('hashchange', function() {
            main_controller () ;
        }) ;
    } else {
        prevHash = window.location.hash;
        window.setInterval (function () {
            if (window.location.hash != prevHash) {
                window.location.reload () ;
            }
        }, 100); 
    }
    

    // First run
    main_controller () ;
    
});
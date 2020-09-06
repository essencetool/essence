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
    
    baseUrl: './js',
    
    
    // Set locale
    locale: localStorage.getItem ('locale'),
    
    
    // For deployment
    /** @link http://requirejs.org/docs/api.html#config-urlArgs */
    urlArgs: function (id, url) {
        
        // By default, args it will be a datetime to avoid cache
        var args = (new Date()).getTime();
        // var args = '';
        
        
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
        
        
        // Assets
        'assetsPath': '../assets',
        
        
        // CSSPaths
        'cssPath': '../css',
        
        
        // Hogan template system
        'hogan': 'vendor/hogan.min',
        
        
        // JQuery
        'jquery': 'vendor/jquery-3.4.1.min',
        
        
        // vex
        'vex': 'vendor/vex.combined.min',
        
        
        // Select2
        'select2': 'vendor/select2.min',
        
        
        // jQuery CSV plugin
        'jquery-csv': 'vendor/jquery.csv.min',
        
        
        // Excel
        'xlsx': 'vendor/xlsx.full.min',
        
        
        // ChartJS
        'chartjs': 'vendor/chart.bunble.min'
        
    },
    
    
    // Dependencies
    shim: {
        
        'jquery-csv': {
            exports: '$',
            deps: ['jquery']
        },
        
        'select2': {
            exports: '$',
            deps: ['jquery']
        },
        
        'helpers': {
            deps: ['db']
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
 
require ([
    'jquery', 
    'config', 
    'db',
    'i18n!nls/translations', 
    'vex',
    'select2'
], function ($, config, db, i18n, vex) {
    
    /** @var body DOM */
    var body = $('body');
    
    
    /** @var html DOM */
    var html = $('html');
    
    
    /** @var nav DOM */
    var nav = $('nav');
    
    
    // Place locale
    html.attr ('lang', localStorage.getItem ('locale'));
    
    
    // Configure VEX
    // VEX is set in "window" to make this feature global
    window.vex.defaultOptions.className = 'vex-theme-plain';
    
    
    // Update cancel
    window.vex.dialog.buttons.NO.text = i18n.vex.cancel;
    
    
    // Tell our webapp that we have a service-worker
    // Notice how we test our browser if 'serviceWorkers' are 
    // supported. If not, our web app should behave as a regular web 
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register ('service-worker.js');
    }
    
    
    // i18n the main page
    $('[data-i18n]').each (function () {
        $(this).html (ref (i18n, $(this).attr ('data-i18n')));
    });
    
    
    // Set base url
    $('.main-header').find ('a').attr ('href', config.base_url);
    
    
    /**
     * Main controller
     *
     * The main controller handles to delegate on controllers according to the
     * hash
     *
     * @package EssenceTool
     */

    var main_controller = function () {
        
        /** @var hash String */
        var hash = getHash ();
        
        
        /** @var params Array */
        var params = getParams ();
        
        
        // Call the controller according to the hash
        route_handler (hash, params);
        
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
        
        // Select the default option according to the hash
        nav
            .find ('.pure-menu-item')
                .removeClass ('pure-menu-selected')
                .find ('.pure-menu-link')
                    .filter ('[href="#' + hash + '"]')
                        .closest ('li')
                            .addClass ('pure-menu-selected')
        ;
        
        
        // Routes. According to the hash call individual controllers
        switch (hash) {
            
            // Set locale
            default:
            case '':
            case 'rate':
                require (['controllers/rate'], function (controller) {
                    controller.index (params);
                });
                break;
                
            case 'import':
                require (['controllers/import-students'], function (controller) {
                    controller.index (params);
                });
                break;
            
            case 'students':
                require (['controllers/students'], function (controller) {
                    controller.index (params);
                });
                break;
                
            case 'student':
                require (['controllers/student'], function (controller) {
                    controller.index (params);
                });
                break;
                
            case 'progress':
                require (['controllers/progress'], function (controller) {
                    controller.index (params);
                });
                break;
            
            case 'export':
                require (['controllers/export'], function (controller) {
                    controller.index (params);
                });
                break;
                
            case 'restore-backup':
                require (['controllers/restore-backup'], function (controller) {
                    controller.index (params);
                });
                break;
                
            case 'projects':
                require (['controllers/projects'], function (controller) {
                    controller.index (params);
                });
                break;
                
            case 'groups':
                require (['controllers/groups'], function (controller) {
                    controller.index (params);
                });
                break;
                
            case 'assessment':
                require (['controllers/assessment'], function (controller) {
                    controller.index (params);
                });
                break;
                
            case 'reset':
                require (['controllers/reset'], function (controller) {
                    controller.index (params);
                });
                break;
                
            case 'set-locale':
                localStorage.setItem ('locale', params[1]) ;
                window.location = '#rate';
                window.location.reload () ;
                break;
                
        }
        
        
        // Remove menu state
        body.removeClass ('state-menu');
    }
    
    
    // Bind menu events
    $('.toggle-menu-action').click (function (e) {
        body.toggleClass ('state-menu');
    });
    
    
    // Get database and ensure indexed db is available
    db.init ().then (function () {
        
        // Handle redirections. Each time the hash changes, we need
        // to perform a call to the main controller to decide in which
        // controller has to delegate to.
        $(window).on ('hashchange', function() {
            main_controller ();
        });
        

        // First run
        main_controller ();
        
    }).catch (function (message) {
        
        window.vex.dialog.alert ({
            message: message,
            callback: function () {
                $('body').removeClass ('loading-state');
            }
        });
        
    });

});
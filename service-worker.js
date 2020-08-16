/**
 * service-worker.js
 *
 * Note: It is important to note that while this event is happening, any 
 * previous version of your service worker is still running and serving pages, 
 * so the things you do here must not disrupt that. For instance, this is not 
 * a good place to delete old caches, because the previous service worker may 
 * still be using them at this point.
 *
 * @link https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 */

'use strict';

/** @const filesToCache Array A list of files to store in cache */
const filesToCache = [

    'android-chrome-512x512.png',
    'android-chrome-192x192.png',
    
    'css/fontello.css',
    'css/pure-min.css',
    'css/normalize.css',
    'css/loader.css',
    'css/main.css',
    'css/desktop.css',
    'css/vex.css',
    'css/vex-theme-plain.css',
    'css/select2.min.css',
    'css/chart.min.css',
    
    'css/font/amatic-sc-v13-cyrillic_latin_latin-ext-regular.woff',
    'css/font/amatic-sc-v13-cyrillic_latin_latin-ext-regular.woff2',
    'css/font/amatic-sc-v13-latin-regular.woff',
    'css/font/amatic-sc-v13-latin-regular.woff2',
    'css/font/fontello.eot',
    'css/font/fontello.svg',
    'css/font/fontello.ttf',
    'css/font/fontello.woff',
    'css/font/fontello.woff2',
    'css/font/montserrat-v14-cyrillic_latin_latin-ext-300.woff',
    'css/font/montserrat-v14-cyrillic_latin_latin-ext-300.woff2',
    'css/font/montserrat-v14-cyrillic_latin_latin-ext-300italic.woff',
    'css/font/montserrat-v14-cyrillic_latin_latin-ext-300italic.woff2',
    'css/font/montserrat-v14-cyrillic_latin_latin-ext-italic.woff',
    'css/font/montserrat-v14-cyrillic_latin_latin-ext-italic.woff2',
    'css/font/montserrat-v14-cyrillic_latin_latin-ext-regular.woff',
    'css/font/montserrat-v14-cyrillic_latin_latin-ext-regular.woff2',
    'css/font/montserrat-v14-latin-300.woff',
    'css/font/montserrat-v14-latin-300.woff2',
    'css/font/montserrat-v14-latin-300italic.woff',
    'css/font/montserrat-v14-latin-300italic.woff2',
    'css/font/montserrat-v14-latin-italic.woff',
    'css/font/montserrat-v14-latin-italic.woff2',
    'css/font/montserrat-v14-latin-regular.woff',
    'css/font/montserrat-v14-latin-regular.woff2',
    
    'img/124673.svg',
    'img/1401915.svg',
    'img/1933935.svg',
    'img/2206440.svg',
    'img/jane.png',
    'img/logo-erasmus.png',
    'img/logo-essence.jpg',
    'img/self-1.png',
    'img/self-2.png',
    'img/self-3.png',
    'img/student.png',
    'img/team-1.png',
    'img/team-2.png',
    'img/team-3.png',
    'img/vision-1.png',
    'img/vision-2.png',
    'img/vision-3.png',
    
    'js/controllers/assessment.js',
    'js/controllers/export.js',
    'js/controllers/groups.js',
    'js/controllers/import-students.js',
    'js/controllers/progress.js',
    'js/controllers/projects.js',
    'js/controllers/rate.js',
    'js/controllers/reset.js',
    'js/controllers/restore-backup.js',
    'js/controllers/student.js',
    'js/controllers/students.js',
    
    'js/nls/assessments.js',
    'js/nls/assessments.json',
    'js/nls/root.json',
    'js/nls/rubrics.js',
    'js/nls/rubrics.json',
    'js/nls/translations.js',
    
    'js/config.js',
    'js/db.js',
    'js/helpers.js',
    'js/i18n.js',
    'js/json.js',
    'js/main.js',
    'js/plugins.js',
    'js/text.js',
    
    'js/vendor/chart.bunble.min.js',
    'js/vendor/hogan.min.js',
    'js/vendor/jquery-3.4.1.min.js',
    'js/vendor/jquery.csv.min.js',
    'js/vendor/modernizr-3.7.1.min.js',
    'js/vendor/require.js',
    'js/vendor/select2.min.js',
    'js/vendor/vex.combined.min.js',
    'js/vendor/xlsx.full.min.js',
    
    'assets/initial-database.json',
    'assets/templates/students.csv',
    'assets/templates/students.xlsx'
    
];


/** @const staticCacheName String The name of the version. Update it to get the new files */
const staticCacheName = 'pages-cache-v2';


// When the service worker is installed...
self.addEventListener ('install', function (event) {
    event.waitUntil (
        caches.open (staticCacheName).then (function (cache) {
            return cache.addAll (filesToCache);
        })
    );
});



/**
 * Cache falling back to the network
 * 
 * If you're making your app offline-first, this is how you'll handle 
 * the majority of requests. 
 *
 * This gives you the "Cache only" behavior for things in the cache and 
 * the "Network only" behaviour for anything not cached 
 * (which includes all non-GET requests, as they cannot be cached).
 */

self.addEventListener ('fetch', function(event) {
    console.log ('@fetch');
    event.respondWith (fetch (event.request).catch (function () {
        return caches.match(event.request);
    }));
});



/**
 * Removing outdated caches
 *
 * Once a new service worker has installed and a previous version 
 * isn't being used, the new one activates, and you get an activate event. 
 * Because the old version is out of the way, it's a good time 
 * to delete unused caches.
 */
self.addEventListener ('activate', function(event) {
    event.waitUntil (
        caches.keys().then (function (filesToCache) {
            return Promise.all (
                filesToCache.filter (function (cacheName) {
                    return true;
                }).map (function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
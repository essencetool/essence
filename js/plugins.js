// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());



/**
 * urlB64ToUint8Array
 *
 * @param base64String String
 * 
 * @link https://codelabs.developers.google.com/codelabs/push-notifications/#2
 *
 * @package EssenceTool
 */

var urlB64ToUint8Array = function (base64String) {
    const padding = '='.repeat ((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

    const rawData = window.atob (base64);
    const outputArray = new Uint8Array (rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt (i);
    }
    return outputArray;
}



/**
 * getParams
 *
 * Return the hash parameters from the URL
 *
 * @param String|null Contains the string to search the params. If no one
 *                    is supplied, then, will get the window.location.hash
 * @package EssenceTool
 */
 
var getParams = function (string) {

    // Recogemos el hash
    if ( ! string) {
        string = window.location.hash;
    }
    
    string = string.replace (/^#/, '');

    
    // Recogemos los parÃ¡metros
    var params = string ;
    var data = string.split('/');
    
    return data ;
}


/**
 * getHash
 *
 * Return the #hash of the URL.
 * This function will also remove the QUERY STRING from
 * the url
 *
 * If the hash is like #hash/param1/param2, this function
 * only return "hash". See getParams function to retrieve
 * other parts from url
 *
 * @package EssenceTool
 */

var getHash = function () {
    
    // Lets take the hash
    var hash = window.location.hash;
    hash = hash.replace (/^#/, '');
    
    
    // Lets take the params
    var data = hash.split('/');
    data[0] = data[0].replace (/\?(.*)/, '') ;

    
    return data[0];
}



/**
 * ref
 *
 * @link https://stackoverflow.com/questions/10934664/convert-string-in-dot-notation-to-get-the-object-reference
 * 
 * @package EssenceTool
 */
function ref (obj, str) {

    // Split into array from dot notation
    var parts = str.split (".");
    
    
    // Remove spaces around
    $.map (parts, $.trim);
    
    
    // Reduce
    for (var i = 0; i < parts.length; i++) {
        if (obj[$.trim (parts[i])]) {
            obj = obj[$.trim (parts[i])];
        } else {
            return str;
        }
        
    }
    
    
    return obj;
}



/**
 * load_css
 *
 * @link http://requirejs.org/docs/faq-advanced.html#css
 * @package EssenceTool
 */

var load_css = function (url) {
    var link = document.createElement ("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url + '?v=' + (new Date()).getTime();
    document.getElementsByTagName("head")[0].appendChild(link);
}


/**
 * pluck
 *
 * @link https://stackoverflow.com/questions/25726066/equivalent-of-underscore-pluck-in-pure-javascript
 * @package EssenceTool
 */
var pluck = function (array, key) {
  return array.map (o => o[key]);
}
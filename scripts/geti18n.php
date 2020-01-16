<?php 

use \Adbar\Dot;
use \Symfony\Component\Finder\Finder;
use \Symfony\Component\ErrorHandler\Debug;

include "vendor/autoload.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

Debug::enable();


/** @var $directories String */
$directories = [
    'i18n'   => ['path' => './../js/nls/', 'filter' => '*.json'],
    'assets' => ['path' => './../assets/', 'filter' => '*.json'],
];


// For each directory
foreach ($directories as $dir) {

    /** @var $finder */
    $finder = new Finder();


    // Find all files in
    $finder->files()->in($dir['path'])->name ($dir['filter']);;

    
    // Get all files
    foreach ($finder as $file) {
        
        /** @var $content Array */ 
        $content = json_decode (file_get_contents ($dir['path'] . $file->getRelativePathname()), true);
        
        
        // With existing array
        $dot = new Dot ($content);
        
        
        /** @var $flatten Array */ 
        $flatten = $dot->flatten ();
        
        
        echo '<h1>' . $file->getRelativePathname() . '</h1>';
        
        
        // Get all keys
        foreach ($flatten as $key => $value) {
            
            if ( ! is_string ($value)) {
                continue;
            }
            
            echo $key . ';' . htmlspecialchars ($value) . '<br />';
        }
    }    
}
<?php 

use \Symfony\Component\Finder\Finder;
use \Symfony\Component\ErrorHandler\Debug;

include "vendor/autoload.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

Debug::enable();


$faker = Faker\Factory::create();



// output headers so that the file is downloaded rather than displayed
header ('Content-Type: text/csv; charset=utf-8');
header ('Content-Disposition: attachment; filename=sample.csv');


// create a file pointer connected to the output stream
$output = fopen ('php://output', 'w');


// output the column headings
fputcsv ($output, ['name', 'identifier']);


// Output ten students
foreach (range (1, 3 * 100) as $index) {
    fputcsv ($output, [$faker->name, $faker->email]);
}

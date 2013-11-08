<?php
require 'Slim/Slim.php';
require 'mongoAPI.php';

header('Access-Control-Allow-Origin: *');

$app = new Slim();

//$app->get('/api/location/:name', function ($name) use($app) {
//    echo $subid;
//});

// this gets ads by location
$app->get('/api/location/:name', function ($name) use($app) {

    $app->response()->header('Content-Type', 'application/json');

//    $ads = array(
//            array('name'=>'hello world'),
//            array("name"=>"goodbye world")
//    );
//
//    echo json_encode($ads);
});

// this gets subscriber page by subscriber id
$app->get('/api/subscriber/:id', function ($id) use($app){

    $response['name'] = "club ".$id;

    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($response);
});

// just a test thing
$app->get('/api/ad/:id', function ($id) use($app){


    $response['name'] = "Mike Jones";

    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($response);
});

$app->run();

//$subid = createSubscriber("derek","arner","pro","doman412@gmail.com","101010");
//echo $subid;
//echo extension_loaded("mongo") ? "loaded\n" : "not loaded\n";
?>
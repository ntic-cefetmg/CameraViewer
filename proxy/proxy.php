<?php

$auth = $_GET['auth'];
$camera = $_GET['camera'];

$opts = [
    "http" => [
        "method" => "GET",
        "header" => "Authorization: Bearer ".$auth."\r\n"
    ]
];

$context = stream_context_create($opts);

$file = file_get_contents('http://localhost/api/cameras/'.$camera, false, $context);

if($file){
    $info = json_decode($file);
    $urlParts = explode('@', $info->accessURL, 2);
    $authentication = substr($urlParts[0],7);
    $urlBroken = explode('/',$urlParts[1],2);
    $server = "tcp://".$urlBroken[0]; // camera server address
    $port = 80; // camera server port
    $url = "/".$urlBroken[1]; // image url on server

    echo $authentication;

    set_time_limit(0);
    $fp = fsockopen($server, $port, $errno, $errstr, 30);
    if (!$fp) {
        echo "$errstr ($errno)<br>\n";   // error handling
    } else {
        $urlstring = "GET ".$url." HTTP/1.0\r\n";
        fputs ($fp, $urlstring);
        fputs($fp, "Authorization: Basic ".base64_encode($authentication)."\r\n\r\n");
        while ($str = trim(fgets($fp, 4096)))
        header($str);
        fpassthru($fp);
        fclose($fp);
    }
}



?>

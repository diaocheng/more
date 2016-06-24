<?php
//header("content-type:text/json;charset=utf-8");
$json = array(
    "total" => 0,
    "rows"  => array(
        array(
            "id"   => 1,
            "name" => "jquery.more.js",
        ),
        array(
            "id"   => 2,
            "name" => "黑桃Lab",
        ),
        array(
            "id"   => 3,
            "name" => "http://www.heitaolab.com",
        ),
    ),
);
echo json_encode($json);

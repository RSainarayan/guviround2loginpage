<?php
// Start the session
session_start();

// Set the Redis server connection details
$redisHost = '127.0.0.1';
$redisPort = 6379;

// Connect to the Redis server
$redis = new Redis();
$redis->connect($redisHost, $redisPort);

// Set the Redis session handler
ini_set('session.save_handler', 'redis');
ini_set('session.save_path', 'tcp://' . $redisHost . ':' . $redisPort);

// Optional: Set a custom session name
// session_name("my_custom_session_name");

// Your application code goes here

// Example: Setting a session variable
$_SESSION['user_id'] = 123;

// Example: Retrieving a session variable
$userID = $_SESSION['user_id'];
echo "User ID: $userID";

// End the session
session_write_close();
?>

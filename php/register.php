<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


$mysqlServername = "localhost";
$mysqlUsername = "root";
$mysqlPassword = "";
$mysqlDbname = "register";

$mysqlConn = new mysqli($mysqlServername, $mysqlUsername, $mysqlPassword, $mysqlDbname);

if ($mysqlConn->connect_error) {
    die("MySQL Connection failed: " . $mysqlConn->connect_error);
}


$mongoServer = "mongodb://localhost:27017/";
$mongoDatabase = "mydatabase";
$mongoCollection = "users";
 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];
    $email = $_POST['email'];
    $dob = $_POST['dob'];
    $number = $_POST['number'];

  
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $mysqlConn->prepare("INSERT INTO users (username, password, email, dob, number) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $username, $hashedPassword, $email, $dob, $number);

 
    $mongoDocument = [
        'username' => $username,
        'password' => $hashedPassword,
        'email' => $email,
        'dob' => $dob,
        'number' => $number,
    ];

    
    if ($stmt->execute()) {
        
        $mongoDb = $mongoClient->$mongoDatabase;
        $mongoCollection = $mongoDb->$mongoCollection;
        $mongoCollection->insertOne($mongoDocument);

        echo "Registration successfully done!";
        // header('Location: ');
        exit;
    } else {
        echo "Error (MySQL): " . $stmt->error;
    }

    $stmt->close();
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

$mysqlConn->close();
?>

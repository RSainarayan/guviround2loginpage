<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "register";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    echo "Welcome to the login form!";
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $loginUsername = $_POST["username"];
    $loginPassword = $_POST["password"];

    $stmt = $conn->prepare("SELECT username, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $loginUsername);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($dbUsername, $dbPassword);
        $stmt->fetch();
    
        
        if (password_verify($loginPassword, $dbPassword)) {
            
            $response = [
                'status' => 'success',
                'message' => 'Login successful',
            ];
        } else {
            
            $response = [
                'status' => 'error',
                'message' => 'Incorrect password',
            ];
        }
    } else {
        
        $response = [
            'status' => 'error',
            'message' => 'Username not found',
        ];
    }
    
    $stmt->close();
    
   
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
    
}

$conn->close();
?>

<?php
session_start();
$answer = json_decode(file_get_contents('php://input'), true);
$level = $answer['level'];


$level = stripslashes($level);
$level = htmlspecialchars($level);

// подключаемся к базе
include("db.php");

$user_id = $_SESSION['user_id'];
$result2 = mysqli_query ($db, "SELECT code FROM saves WHERE user_id = $user_id AND level_id = (SELECT id FROM levels WHERE name = \"$level\" LIMIT 1) LIMIT 1;");

?>
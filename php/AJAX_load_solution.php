<?php
session_start();
$answer = json_decode(file_get_contents('php://input'), true);
$text = $answer['text'];
$level = $answer['level'];



//защита и очистка от пробелов
$text = stripslashes($text);
$text = htmlspecialchars($text);
$level = stripslashes($level);
$level = htmlspecialchars($level);

// подключаемся к базе
include("db.php");

$userId = $_SESSION['userId'];
$_SESSION['rights']=$result['rights'];
$result2 = mysqli_query ($db, "SELECT code FROM solutions WHERE userId = $userId AND levelId = (SELECT id FROM levels WHERE name = \"$level\" LIMIT 1) LIMIT 1;");

?>
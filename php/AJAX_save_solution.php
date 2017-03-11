<?php
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
$result2 = mysqli_query ($db, "INSERT INTO solutions (userId, levelId, code) VALUES(6, (SELECT id FROM levels WHERE name = \"mbr\" LIMIT 1),\"MOV R0 R1\");
");



?>
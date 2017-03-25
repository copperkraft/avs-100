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

$user_id = $_SESSION['user_id'];

$result = mysqli_query($db, "SELECT count(*) as count FROM saves WHERE user_id = $user_id AND level_id = (SELECT level_id FROM levels WHERE codename = \"$level\" limit 1);");
$regCount = mysqli_fetch_assoc($result);
$regCount = (int)$regCount['count'];
echo $regCount;
if ($regCount > 0) {
    $result = mysqli_query($db,
        "UPDATE
                  saves
                SET
                  code=\"$text\"
                WHERE
                  user_id = $user_id
                  AND
                  level_id =
                  (SELECT
                     level_id
                   FROM
                     levels
                   WHERE
                     name = \"$level\"
                   limit 1);");
    echo "UPDATE, result: $result, user ID: $user_id, level: $level, text: $text";
} else {
    $result = mysqli_query($db, "INSERT INTO saves (user_id, level_id, code) VALUES($user_id, (SELECT level_id FROM levels WHERE codename = \"$level\" LIMIT 1),\"$text\");");
    echo "INSERT, result: $result, user ID: $user_id, level: $level, text: $text";
}



?>
<?php
$answer = json_decode(file_get_contents('php://input'), true);
$login = $answer['login'];

$login = stripslashes($login);
$login = htmlspecialchars($login);
$login = trim($login);

include("db.php");

if (empty($login)) {
    echo "empty";
} else {
    $result = mysqli_query($db, "SELECT * FROM users WHERE login='$login'");
    $result = mysqli_fetch_assoc($result);
    if (empty($result['user_id'])) {
        echo "empty";
    }
    else {
        echo "exist";
    }
}

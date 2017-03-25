<?php
session_start();
$answer = json_decode(file_get_contents('php://input'), true);
$login = $answer['login'];
$password = $answer['password'];


//защита и очистка от пробелов
$login = stripslashes($login);
$login = htmlspecialchars($login);
$password = stripslashes($password);
$password = htmlspecialchars($password);
$login = trim($login);
$password = trim($password);



// подключаемся к базе
include("db.php");

if (empty($login) || empty($password)) {
    echo "empty login or password";
    //не должна вызываться клиентом, так как должна быть предусмотрена проверка при регистрации
} else {
    $result = mysqli_query($db, "SELECT COUNT(user_id) as regId FROM users WHERE login='$login'");
    $regCount = mysqli_fetch_assoc($result);
    $regCount = $regCount['regId'];
    if ($regCount > 0) {
        echo "user already exist, user with id = $regCount";
    } else {
        $result2 = mysqli_query ($db,"INSERT INTO users (login,password) VALUES('$login','$password')");
        if ($result2=='TRUE')
        {
            echo "successful registration, user: $login, password: ****";
        }
        else {
            echo "database error";
        }
    }
}
?>
<?php
$answer = json_decode(file_get_contents('php://input'), true);
$login = $answer['login'];
$password = $answer['password'];

$login = stripslashes($login);
$login = htmlspecialchars($login);
$password = stripslashes($password);
$password = htmlspecialchars($password);
$login = trim($login);
$password = trim($password);

include("db.php");

if (empty($login) || empty($password)) {
    echo "empty login or password";
    //не должна вызываться клиентом, так как должна быть предусмотрена проверка при регистрации
} else {
    $result = mysqli_query($db, "SELECT * FROM users WHERE login='$login' AND password='$password'");
    $result = mysqli_fetch_assoc($result);
    if (empty($result['id'])) {
        echo "user do not exist or wrong password";
    }
    else {
        $_SESSION['login']=$result['login'];
        $_SESSION['id']=$result['id'];
        $_SESSION['rights']=$result['rights'];

        $login = $_SESSION['login'];
        echo "success, user: $login";
    }
}

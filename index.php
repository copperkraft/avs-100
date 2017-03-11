<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <link href="css/style.css" rel="stylesheet">
    <meta charset="UTF-8">
    <title>AVS-100</title>
    <link rel="icon" type="image/ico" href="favicon.ico" />
</head>

<body class="dark">
<form action="php/testreg.php" method="post">
    <ul class="menu">
        <li class="menu-link">
            <input placeholder="login" name="login" type="text" size="15" maxlength="15">
        </li>
        <li class="menu-link">
            <input placeholder="password" name="password" type="password" size="15" maxlength="15">
        </li>
        <li class="menu-link">
            <button type="submit" name="submit" >Войти</button>
        </li>
        <li class="menu-link">
            <a href="php/reg.php">Зарегистрироваться</a>
        </li>
        <li class="menu-link">
            <a href="app.php"><?php
                if (empty($_SESSION['login']) or empty($_SESSION['id'])) {
                    echo "Войти как гость<br>";
                } else {
                    echo "Продолжить как ".$_SESSION['login']."<br>";
                }
                ?></a>
        </li>
    </ul>

</body>
</html>
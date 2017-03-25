<?php
session_start();
if (isset($_SESSION['login'])) {
    echo "{login: \"". $_SESSION['login'] ."\",user_id: \"". $_SESSION['user_id'] ."\",loginned: \"true\"}";
} else {
    echo false;
}



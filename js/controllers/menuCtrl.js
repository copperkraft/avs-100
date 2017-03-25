app.controller('menuCtrl', function ($scope, $http) {
    $scope.selected = '';
    $scope.login = '';
    $scope.password = '';
    $scope.signInTitle = 'Введите логин и пароль';
    $scope.authorise = function (login, password) {
        $http.post("php/AJAX_authorisation.php", {login: login, password: password}).success(function (answer) {
            $scope.response = answer;
            console.log(answer);
            if ($scope.response !== "success"){
                alert($scope.response);  //TODO изменить на нормальное сообщение
            } else {
                alert($scope.response);
                $scope.login = login;
            }
        });
    };
    function isValidPassword(passw) {
        return (new RegExp(/[A-Za-z0-9]{6,}/)).test(passw);
    }

    $scope.checkSignIn = function (login, password, registration) {
        $http.post("php/AJAX_existing_user.php", {login: login}).success(function (answer) {
            if (login === '' || password === ''){
                $scope.signInTitle = 'Введите логин и пароль';
            } else if (registration && answer !== "empty"){
                console.log($scope.response);
                $scope.signInTitle = 'Имя занято';
            } else if (!registration && answer === "empty"){
                $scope.signInTitle = 'Пользователь не существует';
            } else if (!(new RegExp(/^[A-Za-z0-9]{2,}$/)).test(login)){
                $scope.signInTitle = 'Некорректный логин';
            } else if (!(new RegExp(/^[A-Za-z0-9]{2,}$/)).test(password)){
                $scope.signInTitle = 'Некорректный пароль';
            } else if (registration) {
                $scope.signInTitle = 'Зарегистрироваться';
            } else {
                $scope.signInTitle = 'Войти';
            }
        });
    };
    $scope.menuItems = [
        {
            name: 'Обучение',
            urlState: '#/training',
            enabled: true
        }, {
            name: 'Песочница',
            urlState: '#/sandbox',
            enabled: true
        }
    ];
    $scope.register = function (login, password) {
        $http.post("php/AJAX_register_new_user.php", {login: login, password: password}).success(function (answer) {
            $scope.response = answer;
            console.log(answer);
            if ($scope.response !== "success"){
                alert($scope.response);  //TODO изменить на нормальное сообщение
            }
        });
    }
});

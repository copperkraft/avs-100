/**
 * Created by Владимир on 01.12.2016.
 */
app.controller('menuCtrl', function ($scope, $http) {
    $scope.menuItems = [
        {
            name: 'Вход',
            urlState: '#/login',
            enabled: false
        }, {
            name: 'Настройки',
            urlState: '#/settings',
            enabled: false
        }, {
            name: 'Обучение',
            urlState: '#/training',
            enabled: true
        }, {
            name: 'Песочница',
            urlState: '#/sandbox',
            enabled: true
        }, {
            name: 'Одиночные задания',
            urlState: '#/levels',
            enabled: true
        }, {
            name: 'Справочник',
            urlState: '#/reference',
            enabled: true
        }, {
            name: 'Тесты',
            urlState: '#/tests',
            enabled: false
        }
    ];
    $scope.register = function (login, password) {
        $http.post("php/AJAX_authorisation.php", {login: "emperor", password: "deadmn"}).success(function (answer) {
            $scope.response = answer;
            console.log(answer);
        });
    }
});

/**
 * Created by Владимир on 01.12.2016.
 */
app.controller('menuCtrl', function ($scope) {
    $scope.menuItems = [
        {
            name: 'Вход',
            urlState: '#/login',
            enabled: true
        }, {
            name: 'Настройки',
            urlState: '#/settings',
            enabled: true
        }, {
            name: 'Обучение',
            urlState: '#/game',
            enabled: true
        }, {
            name: 'Песочница',
            urlState: '#/sandbox',
            enabled: true
        }, {
            name: 'Справочник',
            urlState: '#/reference',
            enabled: true
        }
    ];
});

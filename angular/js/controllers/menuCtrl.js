/**
 * Created by Владимир on 01.12.2016.
 */
app.controller('menuCtrl', function ($scope) {
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
            enabled: false
        }
    ];
});

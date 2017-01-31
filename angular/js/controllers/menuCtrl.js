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


/* <li class="menu-link">Вход</li>
 <li class="menu-link">Настройки</li>
 <li class="menu-link">Обучение</li>
 <li class="menu-link">Игра</li>
 <li class="menu-link">Песочница</li>
 <li class="menu-link">Справочник</li>*/
/**
 * Created by Владимир on 01.12.2016.
 */
app.controller('mainCtrl', function ($scope) {
    $scope.menuItems = [
        {
            name: 'Вход',
            urlState: '#',
            enabled: false
        }, {
            name: 'Настройки',
            urlState: '#',
            enabled: false
        }, {
            name: 'Обучение',
            urlState: 'views/game.html',
            enabled: true
        }, {
            name: 'Игра',
            urlState: '#',
            enabled: false
        }, {
            name: 'Песочница',
            urlState: 'views/sandbox.html',
            enabled: true
        }, {
            name: 'Справочник',
            urlState: '#',
            enabled: false
        }
    ];
});


/* <li class="menu-link">Вход</li>
 <li class="menu-link">Настройки</li>
 <li class="menu-link">Обучение</li>
 <li class="menu-link">Игра</li>
 <li class="menu-link">Песочница</li>
 <li class="menu-link">Справочник</li>*/
app.controller('referenceCtrl', function ($scope) {
    $scope.menuItems = [
        {
            name: 'Как этим пользоваться?',
            urlState: 'referencePages/how_to.html',
            enabled: true
        }, {
            name: 'Часто задаваемые вопросы',
            urlState: '#/reference/faq',
            enabled: false
        }, {
            name: 'Основы работы симулятора',
            urlState: '#/reference/basics',
            enabled: false
        }, {
            name: 'Описание доступных команд',
            urlState: '#/reference/commands',
            enabled: false
        }, {
            name: 'Организация циклов',
            urlState: '#/reference/cycles',
            enabled: false
        }, {
            name: 'Ветвление',
            urlState: '#/reference/if_else',
            enabled: false
        }, {
            name: 'Работа с указателями',
            urlState: '#/reference/pointers',
            enabled: false
        }
    ];
});

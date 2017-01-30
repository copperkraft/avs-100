/**
 * Created by Владимир on 08.12.2016.
 */
app.config(function ($routeProvider) {
    $routeProvider.when('/menu',
        {
            templateUrl: 'views/menu.html',
            controller: 'menuCtrl'
        });
    $routeProvider.when('/sandbox',
        {
            templateUrl: 'views/sandbox.html',
            controller: 'sandboxCtrl'
        });
    $routeProvider.when('/game',
        {
            templateUrl: 'views/game.html',
            controller: 'sandboxCtrl'
        });
    $routeProvider.otherwise({redirectTo: '/menu'});
});

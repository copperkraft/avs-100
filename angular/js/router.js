/**
 * Created by Владимир on 08.12.2016.
 */
angular.module('myApp', ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when('/',
            {
                templateUrl: 'views/menu.html',
                controller: 'mainCtrl'
            });
        $routeProvider.when('/sandbox',
            {
                templateUrl: 'views/game.html',
                controller: 'sandboxCtrl'
            });
    });

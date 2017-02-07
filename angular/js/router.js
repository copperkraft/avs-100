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
            controller: 'editorCtrl'
        });
    $routeProvider.when('/training',
        {
            templateUrl: 'views/training.html',
            controller: 'editorCtrl'
        });
    $routeProvider.when('/levels',
        {
            templateUrl: 'views/levelSelection.html',
            controller: 'levelSelection'
        });
    $routeProvider.when('/settings',
        {
            templateUrl: 'views/settings.html',
            controller: 'settingsCtrl'
        });
    $routeProvider.when('/reference',
        {
            templateUrl: 'views/reference.html',
            controller: 'referenceCtrl'
        });
    $routeProvider.otherwise({redirectTo: '/menu'});
});
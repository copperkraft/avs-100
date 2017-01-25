/**
 * Created by Владимир on 08.12.2016.
 */
angular.module('myApp', ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when('/question',
            {
                templateUrl: 'views/question.html',
                controller: 'QuestionController'
            });
        $routeProvider.when('/answer',
            {
                templateUrl: 'views/answer.html',
                controller: 'AnswerController'
            });
    });

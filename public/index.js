angular.module('summeriesApp',
    [
        'ngResource',
        'ui.router',
        'homeApp',
        'searchApp',
        'mediaApp',
        'homeService',
        'searchService',
        'uiRouterApp'
    ]
);

/*
var summeriesApp = angular.module('summeriesApp', ['ngRoute']);
summeriesApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/main.html',
            controller: 'mainController'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});*/

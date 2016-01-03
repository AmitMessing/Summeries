var summeriesApp = angular.module('summeriesApp', ['ngRoute']);
summeriesApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/main.html',
            controller: 'mainController'
        })
        .when('/about', {
            templateUrl : 'templates/about.html',
            controller  : 'aboutController'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});

summeriesApp.controller('mainController', function($scope, $http) {
    $scope.message = 'Everyone come and see how good I look!';

    $scope.submit = function(){
        $http.get('/about').success(function(data){
            $scope.message = data;
        });
    }
});

summeriesApp.controller('aboutController', function ($scope) {
    //$scope.message = 'Look! I am an about page.';
});
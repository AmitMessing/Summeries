mainApp = angular.module('summeriesApp',
    [
        'ngResource',
        'ui.router',
        'homeApp',
        'searchApp',
        'mediaApp',
        'statisticsApp',
        'uiRouterApp',
        'ngCookies'
    ]
);

mainApp.controller('navbarController', ['$scope', 'userService', function($scope, userService){
        $scope.$watch(function () { return userService.getLoggedUser() }, function(newValue, oldValue){
                if(newValue){
                        $scope.user = JSON.parse(newValue);
                }
                else{
                        $scope.user = newValue;
                }
        });

        $scope.logout = function(){
                userService.logout();
        };
}]);


mainApp = angular.module('summeriesApp',
    [
        'ngResource',
        'ui.router',
        'homeApp',
        'searchApp',
        'mediaApp',
        'uiRouterApp'
    ]
);

mainApp.controller('navbarController', ['$scope', 'userService', function($scope, userService){
        $scope.$watch(function () { return userService.getLoggedUser() }, function(newValue, oldvalue){
                $scope.user = newValue;
        });

        $scope.logout = function(){
                userService.setLoggedUSer(null);
        };
}]);


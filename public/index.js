﻿mainApp = angular.module('summeriesApp',
    [
        'ngResource',
        'ui.router',
        'homeApp',
        'searchApp',
        'mediaApp',
        'statisticsApp',
        'uiRouterApp',
        'ngCookies',
        'ngAnimate'
    ]
);

mainApp.factory('socket', function ($rootScope) {
        var socket = io.connect();
        return {
                on: function (eventName, callback) {
                        socket.on(eventName, function () {
                                var args = arguments;
                                $rootScope.$apply(function () {
                                        callback.apply(socket, args);
                                });
                        });
                },
                emit: function (eventName, data, callback) {
                        socket.emit(eventName, data, function () {
                                var args = arguments;
                                $rootScope.$apply(function () {
                                        if (callback) {
                                                callback.apply(socket, args);
                                        }
                                });
                        })
                }
        };
});

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

mainApp.controller('messagesController', ['$scope', '$timeout', 'socket', function($scope,$timeout,socket){
        $scope.hidden = true;
        socket.on('commentAdded', function(data){
                $scope.msg = data.msg;
                $scope.hidden = false;

                $timeout(function(){
                        $scope.hidden = true;
                },10000);
        });
}]);

app = angular.module('homeApp', ['ui.bootstrap','ui.bootstrap.tpls']);

app.controller('homeController',['$scope','$resource','$state','$window','AllMedia','userService', function ($scope, $resource, $state, $window, AllMedia, userService) {
    $scope.user;
    function init() {
        if ($window.sessionStorage["loggedUser"]) {
            $scope.user = userService.getLoggedUser();
        }
    }

    init();
    $scope.allMedia = [];
    $scope.getAllMedia = function() {
            AllMedia.query(function (allMedia) {
                allMedia.map(function(media){
                    media.releaseDate = new Date(media.releaseDate);
                    $scope.allMedia.push(media);
                });
            });
        };
    $scope.logout = function(){
        userService.setLoggedUSer(null);
        $scope.user = JSON.parse($window.sessionStorage["loggedUser"]);
    };

        $scope.addMedia = function(){
            var modalInstance = $uibModal.open({
                templateUrl: 'templates/addMediaModal.html',
                controller: 'addMediaController',
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.allMedia;
                    }
                }
            });
        }
    }]);
app.controller('addMediaController',['$scope','$resource','$state','$uibModal','AllMedia'
    ,function ($scope, $resource, $state, $uibModal, AllMedia) {

    }]);

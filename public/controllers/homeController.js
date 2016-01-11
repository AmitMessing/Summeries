app = angular.module('homeApp', ['ui.bootstrap','ui.bootstrap.tpls']);

app.controller('homeController',['$scope','$resource','$state','$uibModal','AllMedia','userService', function ($scope, $resource, $state, $uibModal, AllMedia, userService) {
       $scope.user = userService.getLoggedUser();

        $scope.getAllMedia = function() {
            AllMedia.query(function (allMedia) {
                $scope.allMedia = allMedia;
            });
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

app = angular.module('homeApp', ['ui.bootstrap','ui.bootstrap.tpls']);

app.controller('homeController',['$scope','$resource','$state','$uibModal','AllMedia', function ($scope, $resource, $state, $uibModal, AllMedia) {
    $scope.allMedia = [];
    $scope.getAllMedia = function() {
            AllMedia.query(function (allMedia) {
                allMedia.map(function(media){
                    media.releaseDate = new Date(media.releaseDate);
                    $scope.allMedia.push(media);
                });
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
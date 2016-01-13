angular.module('homeApp', ['ui.bootstrap','ui.bootstrap.tpls'])
    .controller('homeController',['$scope','$resource', function ($scope,$resource) {
        $scope.allMedia = [];
        $scope.getAllMedia = function() {
            $resource('/home/getAllMedia').query(function (allMedia) {
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
    }])
    .controller('addMediaController',['$scope','$resource','$state','$uibModal','AllMedia',function ($scope, $resource, $state, $uibModal, AllMedia) {

    }]);

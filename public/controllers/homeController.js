angular.module('homeApp', ['ui.bootstrap'])
    .controller('homeController',['$scope','$resource','$uibModal', function ($scope,$resource,$uibModal) {
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

        $scope.openAdvanceSearchInstruction = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'templates/advanceSearchInstructions.html',
                controller: 'advanceSearchInstruction',
                size: 'lg',
                resolve: {
                }
            });
        };
    }])
    .controller('addMediaController',['$scope','$resource','$state','$uibModal','AllMedia',function ($scope, $resource, $state, $uibModal, AllMedia) {

    }])
    .controller('advanceSearchInstruction',['$uibModal', function ($uibModal) {

    }]);

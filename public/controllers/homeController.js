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

        $scope.openAdvanceSearchInstruction = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'templates/advanceSearchInstructions.html',
                controller: '',
                size: 'lg',
                resolve: {
                }
            });
        };
    }]);
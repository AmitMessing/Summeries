angular.module('homeApp', [])
    .controller('homeController',['$scope', 'Medias', function ($scope, Medias) {
        $scope.getMedias = function() {
            Medias.query(function (medias) {
                $scope.medias = medias;
            });
        };
    }]);
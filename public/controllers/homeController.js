angular.module('homeApp', [])
    .controller('homeController',['$scope','$resource', 'AllMedia', 'searchService', '$state', function ($scope, $resource, AllMedia, searchService, $state) {
        $scope.getAllMedia = function() {
            AllMedia.query(function (allMedia) {
                $scope.allMedia = allMedia;
            });
        };

        $scope.setSearchQuery = function(searchQuery){
            if (!searchQuery){
                return;
            }
            searchService.setSearchQuery(searchQuery);
            $state.go('searchResult');
        }
    }]);
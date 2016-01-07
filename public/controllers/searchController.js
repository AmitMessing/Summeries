angular.module('searchApp', [])
    .controller('searchController',['$scope', 'searchService', function ($scope,searchService) {
        $scope.search = function(){
            searchService.search().query(function(searchResult){
                $scope.searchResult = searchResult;
            })
        }
    }]);
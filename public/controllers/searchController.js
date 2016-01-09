angular.module('searchApp', [])
    .controller('searchController',['$scope', 'searchService', function ($scope,searchService) {
        $scope.search = function(){
            var searchResultCallback = searchService.search();
            if (searchResultCallback){
                searchResultCallback.query(function(searchResult){
                    $scope.searchResult = searchResult;
                })
            }
        }
    }]);
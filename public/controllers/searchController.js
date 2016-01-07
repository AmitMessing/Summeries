angular.module('SearchApp', [])
    .controller('SearchController',['$scope', 'searchService', function ($scope,searchService) {
        $scope.search = function(){
            searchService.search().query(function(searchResult){
                $scope.searchResult = searchResult;
            })
        }
    }]);
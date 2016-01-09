angular.module('searchApp', [])
    .controller('searchController',['$scope', '$stateParams', '$resource', function ($scope,$stateParams,$resource) {
        var searchQuery = $stateParams.searchQuery;

        $scope.init = function(){
            if (searchQuery) {
                $resource('/searchResult/:searchQuery', {searchQuery: searchQuery}).query(function (searchResult) {
                    $scope.searchResult = searchResult;
                });
            }
        }
    }]);
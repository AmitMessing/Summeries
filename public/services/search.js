angular.module('searchService', [])
    .service('searchService', ['$resource', function($resource) {
            var searchQuery = "";

            var setSearchQuery = function(query){
                searchQuery = query;
            };

            var search = function(){
                return $resource('/searchMedia/:searchQuery', { searchQuery: searchQuery});
            };

            return {
                setSearchQuery: setSearchQuery,
                search: search
            };
        }]
    );

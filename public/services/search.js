angular.module('searchService', [])
    .service('searchService', function() {
            var searchQuery = "";

            var setSearchQuery = function(query){
                searchQuery = query;
            };

            var search = function(){
                return $resource('/home/SearchMedia/:searchQuery', { searchQuery: searchQuery});
            };

            return {
                setSearchQuery: setSearchQuery,
                search: search
            };
        }
    );

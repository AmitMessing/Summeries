angular.module('homeService', [])
    .factory('AllMedia', ['$resource',
        function($resource) {
            return  $resource('/home/getAllMedia')
    }])
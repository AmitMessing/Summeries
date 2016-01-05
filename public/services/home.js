angular.module('homeService', [])
    .factory('Medias', ['$resource',
        function($resource) {
            return  $resource('/home/getMedias', {},{get: {method: 'GET',isArray: true}})
    }])
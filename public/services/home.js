angular.module('homeService', [])
    .factory('Medias', ['$resource',
        function($resource) {
            return $resource('/home/GetMedias', {
            },
            {
                update: {
                    method: 'PUT' // this method issues a PUT request
                }
            })
    }])
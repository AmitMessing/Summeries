angular.module('uiRouterApp', [])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider,   $urlRouterProvider) {
            $urlRouterProvider
                .otherwise('/');

            $stateProvider

            // home page
                .state('home', {
                    url: '/',
                    templateUrl: 'templates/home.html',
                    controller: 'homeController'
                })
}]);
angular.module('uiRouterApp', [])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider,   $urlRouterProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $urlRouterProvider
                .otherwise('/');

            $stateProvider
                // home page
                .state('home', {
                    url: '/',
                    templateUrl: 'templates/home.html',
                    controller: 'homeController'
                })
                .state('advanceSearchInstructions', {
                    url: '/advanceSearchInstructions',
                    templateUrl:'templates/advanceSearchInstructions.html',
                    controller: ''
                }).
                state('searchResult', {
                    url: '/searchResult',
                    templateUrl: 'templates/searchResult.html',
                    controller: 'searchController'
                }).
                state('mediaDetails',
                {
                    url:'/mediaDetails',
                    templateUrl:'templates/mediaDetails.html',
                    controller: 'mediaController',
                    params:{
                        mediaId: {
                            value:-1
                        },
                        hiddenParam: 'YES'
                    }
                })
}]);
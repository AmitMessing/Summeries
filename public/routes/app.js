angular.module('uiRouterApp', [])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider,   $urlRouterProvider, $locationProvider) {
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
                    url: '/searchResult/:searchQuery',
                    templateUrl: 'templates/searchResult.html',
                    controller: 'searchController'
                }).
                state('mediaDetails',
                {
                    url:'/mediaDetails/:mediaId',
                    templateUrl:'templates/mediaDetails.html',
                    controller: 'mediaController'
                }).
                state('userDetails',
                {
                    url:'/userDetails/:userId',
                    templateUrl:'templates/userDetails.html',
                    controller: 'userController'
                }).
                state('register',
                {
                    url:'/register',
                    templateUrl:'templates/register.html',
                    controller: 'userController'
                })
}]);
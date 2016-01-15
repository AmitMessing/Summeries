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
                }).
                state('searchResult', {
                    url: '/searchResult/:searchQuery',
                    templateUrl: 'templates/searchResult.html',
                    controller: 'searchController'
                }).
                state('getAllMovies', {
                    url: '/getAllMovies',
                    templateUrl: 'templates/allMovies.html',
                    controller: 'mediaController'
                }).
                state('getAllSeries', {
                    url: '/getAllSeries',
                    templateUrl: 'templates/allSeries.html',
                    controller: 'mediaController'
                }).
                state('mediaDetails',
                {
                    url:'/mediaDetails/:mediaId',
                    templateUrl:'templates/mediaDetails.html',
                    controller: 'mediaController'
                }).
                state('updateUser',
                {
                    url:'/updateUser',
                    templateUrl:'templates/userDetails.html',
                    controller: 'userController'
                }).
                state('register',
                {
                    url:'/register',
                    templateUrl:'templates/register.html',
                    controller: 'userController'
                }).
                state('login',
                {
                    url:'/login',
                    templateUrl:'templates/login.html',
                    controller: 'userController'
                }).
                state('addMedia',
                {
                    url:'/addMedia',
                    templateUrl:'templates/addMedia.html',
                    controller:'addMediaController'
                }).
                state('statistics',
                {
                    url:'/statistics',
                    templateUrl:'templates/statistics.html',
                    controller:'statisticsController'
                }).
                state('addComment',
                {
                    url:'/addComment',
                    templateUrl:'templates/mediaDetails.html',
                    controller:'mediaController'
                }).
                state('/deleteUser/:id',
                {
                    url:'/deleteUser/:id',
                    templateUrl:'templates/userDetails.html',
                    controller:'userController'
                })
}]);
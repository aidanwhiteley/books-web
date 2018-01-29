/*global angular: false */
(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name booksWebApp
     * @description
     * # booksWebApp
     *
     * Main module of the application.
     */
    angular
        .module('booksWebApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch'
        ])
        .constant('booksConstants', {
            // ************************************
            // Constants that control app behaviour.
            // ************************************

            apiEndPoint: 'http://localhost:8080/api',
            secureApiEndPoint: 'http://localhost:8080/secure/api',
            defaultPageSize: 5
        })
        .config(function ($locationProvider, $routeProvider, $logProvider, $httpProvider) {

            // Needed for CORS in development (at least)
            $httpProvider.defaults.withCredentials = true;

            // TODO - this is not working - therefore log statements coded to info level!
            $logProvider.debugEnabled(true);

            $locationProvider.hashPrefix('');
            //$locationProvider.html5Mode({
            //    enabled: true,
            //    requireBase: false,
            //    rewriteLinks: false
            //});

            $routeProvider
                .when('/', {
                    templateUrl: 'views/summary.html',
                    controller: 'SummaryCtrl',
                    controllerAs: 'summary'
                })
                .when('/add', {
                    templateUrl: 'views/createedit.html',
                    controller: 'CreateEditCtrl',
                    controllerAs: 'create'
                })
                .when('/edit', {
                    templateUrl: 'views/createedit.html',
                    controller: 'CreateEditCtrl',
                    controllerAs: 'edit'
                })
                .when('/users', {
                    templateUrl: 'views/adminusers.html',
                    controller: 'UserCtrl',
                    controllerAs: 'users'
                })
                .when('/book/:id', {
                    templateUrl: 'views/bookdetails.html',
                    controller: 'BookCtrl',
                    controllerAs: 'book'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }).run(function () {

        }).filter('capitalize', function () {
            // TODO - move this filter somewhere more appropriate
            return function (input) {
                return (input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
            };
        });
}());

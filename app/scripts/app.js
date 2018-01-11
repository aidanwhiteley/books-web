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
            secureApiEndPoint: 'http://localhost:8080/secure/api'
        })
        .config(function ($locationProvider, $routeProvider, $logProvider, $httpProvider) {
        
            // Needed for CORS in development (at least)
            $httpProvider.defaults.withCredentials = true;

            // TODO - this is not working - therefore log statements coded to info level!
            $logProvider.debugEnabled(true);

            $locationProvider.hashPrefix('');

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

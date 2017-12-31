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
        .constant('booksWebAppConstants', {
            // ************************************
            // Constants that control app behaviour.
            // ************************************

            // Placeholder
            doStuff: false
        })
        .config(function ($locationProvider, $routeProvider, $logProvider) {

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

/*global angular: false, window: false */
(function () {
    'use strict';

    // Import "environment" variables if present (from env.js)
    var env = window.__env;
    if (window) {
        //Object.assign(env, window.__env);
        //$.extend({}, window.__env, env);
    }

    angular
        .module('booksWebApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'bootstrap3-typeahead'
        ])
        .constant('booksConstants', {
            // ************************************
            // Constants that control app behaviour.
            // Most of these are externalised to 
            // the env.js file.
            // ************************************

            'env': env,
            menuItems: {
                'SUMMARY': 'summary',
                'RATING': 'rating',
                'GENRE': 'genre',
                'AUTHOR': 'author',
                'READER': 'reader',
                'ADDBOOK': 'addbook',
                'ADMINUSERS': 'adminusers'
            }
        })
        .config(function ($locationProvider, $routeProvider, $logProvider, $httpProvider, booksConstants) {

            // Needed for CORS in development (at least)
            if (booksConstants.env.useCORS) {
                $httpProvider.defaults.withCredentials = true;
            }

            // TODO - this is not working - therefore log statements coded to info level!
            $logProvider.debugEnabled(booksConstants.env.debugOn);

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
                    controller: 'MenuCtrl',
                    controllerAs: 'users'
                })
                .when('/book/:id', {
                    templateUrl: 'views/bookdetails.html',
                    controller: 'BookCtrl',
                    controllerAs: 'book'
                })
                .when('/booksbygenre', {
                    templateUrl: 'views/summary.html',
                    controller: 'SummaryCtrl',
                    controllerAs: 'summary'
                })
                .when('/booksbyauthor', {
                    templateUrl: 'views/summary.html',
                    controller: 'SummaryCtrl',
                    controllerAs: 'summary'
                })
                .when('/booksbyreader', {
                    templateUrl: 'views/summary.html',
                    controller: 'SummaryCtrl',
                    controllerAs: 'summary'
                })
                .when('/booksbyrating', {
                    templateUrl: 'views/summary.html',
                    controller: 'SummaryCtrl',
                    controllerAs: 'summary'
                })
                .when('/privacy', {
                    templateUrl: 'views/privacy.html'
                })
                .when('/help', {
                    templateUrl: 'views/help.html'
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

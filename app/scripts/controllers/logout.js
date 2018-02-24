/*global angular: false */
(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name booksWebApp.controller:LogoutCtrl
     * @description
     * # LogoutCtrl
     * Controller of the booksWebApp
     */
    angular.module('booksWebApp')
        .controller('LogoutCtrl', function ($scope, $log, $window, userDataService, $location, booksConstants, menuService) {

            menuService.setMenuItem(booksConstants.menuItems.SUMMARY);
                  
            $scope.env = booksConstants.env;

            /**
             * Logout
             */
            $scope.logout = function () {
                userDataService.logout()
                    .then(
                        function () {
                            //$location.url('/').replace();
                            $window.location.href = '/';
                        },
                        function (data) {
                            $log.error('Failed to log out user: ' + JSON.stringify(data));
                        }
                    );
            };

            $scope.logout();
        
        });
}());

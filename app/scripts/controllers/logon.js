/*global angular: false */
(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name booksWebApp.controller:LogonCtrl
     * @description
     * # LogonCtrl
     * Controller of the booksWebApp
     */
    angular.module('booksWebApp')
        .controller('LogonCtrl', function ($scope, $log, userDataService) {
        
            $scope.loggedOn = false;

            /**
             * Get user data
             */
            $scope.getUserData = function () {

                userDataService.getUser()
                    .then(
                        function (data) {
                            $scope.loggedOn = true;
                            $scope.user = data.data;
                        },
                        function () {
                            $log.error('Failed to get user data');
                            $scope.loggedOn = false;
                            $scope.user = {};
                        }
                    );
            };

            $scope.getUserData();

        });
}());

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
        .controller('LogonCtrl', function ($scope, $log, $location, userDataService) {

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

            // oauth logon services asked to redirect back with l=1 parameter (i.e. logged on of true).
            // This is to prevent unnecessary Ajax call when we know user is not logged on.
            if ($location.search().l === '1') {
                $scope.getUserData();
            }

        });
}());

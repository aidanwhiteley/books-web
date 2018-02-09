/*global angular: false */
(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name booksWebApp.controller:HelpCtrl
     * @description
     * # HelpCtrl
     * Controller of the booksWebApp
     */
    angular.module('booksWebApp')
        .controller('HelpCtrl', function ($scope, $log, userDataService, booksConstants, menuService) {

            menuService.setMenuItem(booksConstants.menuItems.NONE);
                  
            $scope.resetAccess = function () {
                $scope.isAdmin = false;
                $scope.isEditor = false;
                $scope.isUser = false;
                $scope.isAnonymous = false;
                $scope.user = {};
            };


            $scope.env = booksConstants.env;

            /**
             * Get user data
             */
            $scope.getUserData = function () {

                $scope.resetAccess();
                
                userDataService.getUser()
                    .then(
                        function (user) {
                            $scope.isAdmin = user.roles.indexOf('ROLE_ADMIN') >= 0;
                            $scope.isEditor = user.roles.indexOf('ROLE_EDITOR') >= 0;
                            $scope.isUser = user.roles.indexOf('ROLE_USER') >= 0;
       
                            $scope.user = user;
                        },
                        function (errors) {
                            if (errors.status !== 403) {
                                $log.error('Failed to get user data for help page: ' + JSON.stringify(errors));
                            }
                            $scope.isAnonymous = true;
                        }
                    );
            };

            $scope.getUserData();
        });
}());

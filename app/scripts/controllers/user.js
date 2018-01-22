/*global angular: false */
(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name booksWebApp.controller:UserCtrl
     * @description
     * # UserCtrl
     * Controller of the booksWebApp
     */
    angular.module('booksWebApp')
        .controller('UserCtrl', function ($scope, $log, $location, userDataService) {

            /**
             * Get user data
             */
            $scope.getUserData = function () {

                userDataService.getUser()
                    .then(
                        function (data) {
                            data.data.admin = $scope.isAdmin(data.data);
                            data.data.editor = $scope.isEditor(data.data);
                            $scope.user = data.data;
                        },
                        function () {
                            $log.error('Failed to get user data');
                            $scope.user = null;
                        }
                    );
            };

            $scope.getUsers = function () {

                var i;

                userDataService.getUsers()
                    .then(
                        function (data) {
                            for (i = 0; i < data.data.length; i = i + 1) {
                                data.data[i].admin = $scope.isAdmin(data.data[i]);
                                data.data[i].editor = $scope.isEditor(data.data[i]);
                            }
                            $scope.users = data.data;
                        },
                        function () {
                            $log.error('Failed to get users data');
                            $scope.users = {};
                        }
                    );
            };

            // oauth logon services asked to redirect back with l=1 parameter (i.e. logged on of true).
            // This is to prevent unnecessary Ajax call when we know user is not logged on.
            if ($location.search().l === '1') {
                $scope.getUserData();
            }

            if ($location.path() === '/users') {
                $scope.getUsers();
            }

            $scope.isAdmin = function (user) {
                return (-1 !== user.roles.indexOf('ROLE_ADMIN'));
            };

            $scope.isEditor = function (user) {
                return (-1 !== user.roles.indexOf('ROLE_EDITOR'));
            };

            $scope.deleteUser = function (user) {

                userDataService.deleteUser(user)
                    .then(
                        function () {
                            $scope.msgUserDeleteOK = true;
                            $scope.msgUserDeleteNotOK = false;
                            $scope.getUsers();
                        },
                        function () {
                            $scope.msgUserDeleteOK = false;
                            $scope.msgUserDeleteNotOK = true;
                        }
                    );
            };

            $scope.toggleEditor = function (user) {
                user.editor = !user.editor;
                
                userDataService.alterUserPermissions(user)
                    .then(
                        function () {
                            $scope.msgUserUpdatedOK = true;
                            $scope.msgUserUpdatedNotOK = false;
                        },
                        function () {
                            $scope.msgUserUpdatedOK = false;
                            $scope.msgUserUpdatedNotOK = true;
                        }
                    );
            };

            $scope.toggleAdmin = function (user) {
                user.admin = !user.admin;
                
                userDataService.alterUserPermissions(user)
                    .then(
                        function () {
                            $scope.msgUserUpdatedOK = true;
                            $scope.msgUserUpdatedNotOK = false;
                        },
                        function () {
                            $scope.msgUserUpdatedOK = false;
                            $scope.msgUserUpdatedNotOK = true;
                        }
                    );
            };

            $scope.pad = function (str, max) {
                str = str.toString();
                return str.length < max ? $scope.pad("0" + str, max) : str;
            };

        });
}());

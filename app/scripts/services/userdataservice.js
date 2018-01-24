/*global angular: false */
(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name booksWebApp.userDataService
     * @description
     * # userDataService
     *
     * Service in the booksWebApp.
     * AngularJS will instantiate a singleton by calling "new" on this function.
     */
    angular.module('booksWebApp')
        .service('userDataService', function ($http, $q, $log, booksConstants) {

            this.getUser = function () {
                var url, deferred;

                url = booksConstants.secureApiEndPoint + '/user';
                deferred = $q.defer();

                $http.get(url)
                    .then(
                        function (data) {
                            deferred.resolve(data);
                        },
                        function (errors) {
                            $log.error('Failed to get data for the user: ' + JSON.stringify(errors));
                            deferred.reject(errors);
                        }
                    );

                return deferred.promise;
            };

            this.getUsers = function () {
                var url, deferred;

                url = booksConstants.secureApiEndPoint + '/users';
                deferred = $q.defer();

                $http.get(url)
                    .then(
                        function (data) {
                            deferred.resolve(data);
                        },
                        function (errors) {
                            $log.error('Failed to list of users');
                            deferred.reject(errors);
                        }
                    );

                return deferred.promise;
            };

            this.deleteUser = function (user) {
                var url;

                url = booksConstants.secureApiEndPoint + '/users/' + user.id;

                return $http.delete(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to delete user: ' + user.id + ' ' + user.fullName + ' ' +
                                  'Message: ' + error.data.msg + ' Status: ' + error.status);
                        throw error;
                    });
            };

            this.alterUserPermissions = function (user) {
                var url, clientRoles = {};

                url = booksConstants.secureApiEndPoint + '/users/' + user.id;

                clientRoles.id = user.id;
                clientRoles.admin = user.admin;
                clientRoles.editor = user.editor;

                return $http.patch(url, clientRoles)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to update permissions for user: ' + user.id + ' ' + user.fullName + ' ' +
                                  'Message: ' + error.data.msg + ' Status: ' + error.status);
                        throw error;
                    });
            };

        });
}());

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
     */
    angular.module('booksWebApp')
        .service('userDataService', function ($http, $q, $log, booksConstants) {

            this.getUser = function () {
                var url = booksConstants.secureApiEndPoint + '/user';

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get data for user. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };

            this.getUsers = function () {
                var url = booksConstants.secureApiEndPoint + '/users';

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get list of users. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };

            this.deleteUser = function (user) {
                var url = booksConstants.secureApiEndPoint + '/users/' + user.id;

                return $http.delete(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        if (error.status !== 409) {
                            $log.error('Failed to delete user: ' + user.id + ' ' + user.fullName +
                                ' Error data: ' + JSON.stringify(error));
                        }
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
                        if (error.status !== 409) {
                            $log.error('Failed to update permissions for user: ' + user.id + ' ' + user.fullName +
                                ' Error data: ' + JSON.stringify(error));
                        }
                        throw error;
                    });
            };

        });
}());

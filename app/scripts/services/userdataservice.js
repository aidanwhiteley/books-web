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

            var cachedUserData = null, deferred, user;

            function isAdmin(user) {
                return (-1 !== user.roles.indexOf('ROLE_ADMIN'));
            }

            function isEditor(user) {
                return (-1 !== user.roles.indexOf('ROLE_EDITOR'));
            }

            this.getUser = function () {

                var url = booksConstants.env.secureApiEndPoint + '/user';

                // Note - a logged on user cant alter their own data. However, this
                //        caching does mean that a user will need to refresh the page
                //        before they see any change in their permissions.
                if (cachedUserData) {
                    deferred = $q.defer();
                    deferred.resolve(cachedUserData);
                    return deferred.promise;
                }

                return $http.get(url)
                    .then(function onSuccess(response) {
                        user = response.data;
                        user.admin = isAdmin(user);
                        user.editor = isEditor(user);

                        cachedUserData = user;
                        return user;
                    }).catch(function onError(error) {
                        if (error.status !== 403) {
                            $log.error('Failed to get data for user. Error data: ' + JSON.stringify(error));
                        }
                        throw error;
                    });
            };

            this.getUsers = function () {
                var url = booksConstants.env.secureApiEndPoint + '/users',
                    i;

                return $http.get(url)
                    .then(function onSuccess(response) {
                        for (i = 0; i < response.data.length; i = i + 1) {
                            response.data[i].admin = isAdmin(response.data[i]);
                            response.data[i].editor = isEditor(response.data[i]);
                        }
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get list of users. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };

            this.deleteUser = function (user) {
                var url = booksConstants.env.secureApiEndPoint + '/users/' + user.id;

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

                url = booksConstants.env.secureApiEndPoint + '/users/' + user.id;

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

            this.logout = function () {
                var url = booksConstants.env.logoutEndPoint;

                return $http.post(url)
                    .then(function onSuccess(response) {
                        return response;
                    }).catch(function onError(error) {
                        $log.error('Failed to log the user out using POST to server: ' + JSON.stringify(error));
                        throw error;
                    });

            };

        });


}());

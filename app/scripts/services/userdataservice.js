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
                var url, deferred;

                url = booksConstants.secureApiEndPoint + '/users/' + user.id;
                deferred = $q.defer();

                $http.delete(url)
                    .then(
                        function (data) {
                            deferred.resolve(data);
                        },
                        function (errors) {
                            $log.error('Failed to delete user: ' + user.id + ' ' + user.fullName + ' ' + JSON.stringify(errors));
                            deferred.reject(errors);
                        }
                    );

                return deferred.promise;
            };

        });
}());

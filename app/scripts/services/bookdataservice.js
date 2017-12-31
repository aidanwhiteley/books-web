/*global angular: false */
(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name booksWebApp.bookDataService
     * @description
     * # bookDataService
     *
     * Service in the booksWebApp.
     * AngularJS will instantiate a singleton by calling "new" on this function.
     */
    angular.module('booksWebApp')
        .service('bookDataService', function ($http, $q, $log, summaryDataService) {

            this.createBook = function (book) {
                var urls, deferred, urlCalls = [],
                    config = {
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8;'
                        }
                    };

                urls = [{
                    'url': 'http://localhost:8080/api/books'
                }];

                deferred = $q.defer();
                angular.forEach(urls, function (url) {
                    urlCalls.push($http.post(url.url, book, config));
                });

                if (!book.lastRead) {
                    book.lastRead = new Date();
                }

                // Still using 'all' even though only one Ajax call currently being made here.
                $q.all(urlCalls)
                    .then(
                        function () {
                            summaryDataService.clearCache();
                            deferred.resolve(true);
                        },
                        function (errors) {
                            $log.error('Failed to create a new book: ' + JSON.stringify(errors));
                            deferred.reject(errors);
                        },
                        function (updates) {
                            deferred.update(updates);
                        }
                    );

                return deferred.promise;
            };
        
            this.updateBook = function (book) {
                var urls, deferred, urlCalls = [],
                    config = {
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8;'
                        }
                    };

                urls = [{
                    'url': 'http://localhost:8080/api/books'
                }];

                deferred = $q.defer();
                angular.forEach(urls, function (url) {
                    urlCalls.push($http.put(url.url, book, config));
                });


                // Still using 'all' even though only one Ajax call currently being made here.
                $q.all(urlCalls)
                    .then(
                        function () {
                            summaryDataService.clearCache();
                            deferred.resolve(true);
                        },
                        function (errors) {
                            $log.error('Failed to update an existing new book: ' + JSON.stringify(errors));
                            deferred.reject(errors);
                        },
                        function (updates) {
                            deferred.update(updates);
                        }
                    );

                return deferred.promise;
            };


            this.deleteBook = function (book) {
                var url, deferred, config = {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8;'
                    }
                };

                url = 'http://localhost:8080/api/books/' + book.id;
                deferred = $q.defer();

                $http.delete(url, config)
                    .then(
                        function () {
                            summaryDataService.clearCache();
                            deferred.resolve(true);
                        },
                        function (errors) {
                            $log.error('Failed to delete the specified book: ' + JSON.stringify(errors));
                            deferred.reject(errors);
                        },
                        function (updates) {
                            deferred.update(updates);
                        }
                    );

                return deferred.promise;
            };
        
            this.getBook = function (id) {
                var url, deferred;

                url = 'http://localhost:8080/api/books/' + id;
                deferred = $q.defer();

                $http.get(url)
                    .then(
                        function (data) {
                            deferred.resolve(data);
                        },
                        function (errors) {
                            $log.error('Failed to get the specified book: ' + JSON.stringify(errors));
                            deferred.reject(errors);
                        }
                    );

                return deferred.promise;
            };

        });
}());

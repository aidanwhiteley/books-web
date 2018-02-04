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
        .service('bookDataService', function ($http, $q, $log, summaryDataService, booksConstants) {

            this.createBook = function (book) {

                var url = booksConstants.secureApiEndPoint + '/books';

                book.entered = new Date();

                return $http.post(url, book)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {

                        $log.error('Failed to create a new book. Error data: ' + JSON.stringify(error));
                        throw error;
                    });

            };

            this.updateBook = function (book) {
                var url = booksConstants.secureApiEndPoint + '/books';

                return $http.put(url, book)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to update an existing new book. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };


            this.deleteBook = function (book) {
                var url = booksConstants.secureApiEndPoint + '/books/' + book.id;

                return $http.delete(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to delete the specified book. Error data: ' + JSON.stringify(error));
                        throw error;
                    });

            };

            this.getBook = function (id) {
                var url = booksConstants.apiEndPoint + '/books/' + id;

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get the specified book. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };


            this.getBooks = function (page, size) {
                var url = booksConstants.apiEndPoint + '/books/?page=' + page + '&size=' + size;

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get books. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };

            this.getBooksByRating = function (rating, page, size) {
                var url = booksConstants.apiEndPoint + '/books/?rating=' + rating + '&page=' + page + '&size=' + size;

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get books by rating. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };

            this.getBooksByGenre = function (genre, page, size) {
                var url = booksConstants.apiEndPoint + '/books/?genre=' + genre + '&page=' + page + '&size=' + size;

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get books by genre. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };
        
            this.getBookGenres = function () {
                var url = booksConstants.apiEndPoint + '/books/genres';

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get list of book genres. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };

            this.getGoogleBooks = function (title) {
                var url = booksConstants.apiEndPoint + '/googlebooks/?title=' + title;

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get google books. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };

        });
}());

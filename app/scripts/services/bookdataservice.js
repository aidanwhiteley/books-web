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

                var url = booksConstants.env.secureApiEndPoint + '/books';

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
                var url = booksConstants.env.secureApiEndPoint + '/books';

                return $http.put(url, book)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to update an existing book. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };


            this.deleteBook = function (book) {
                var url = booksConstants.env.secureApiEndPoint + '/books/' + book.id;

                return $http.delete(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to delete the specified book. Error data: ' + JSON.stringify(error));
                        throw error;
                    });

            };

            this.getBook = function (id) {
                var url = booksConstants.env.apiEndPoint + '/books/' + id;

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get the specified book. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };


            this.getBooks = function (page, size) {
                var url = booksConstants.env.apiEndPoint + '/books/?page=' + page + '&size=' + size;

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get books. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };

            this.getBooksByRating = function (rating, page, size) {
                var url = booksConstants.env.apiEndPoint + '/books/?rating=' + rating + '&page=' + page + '&size=' + size;

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get books by rating. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };

            this.getBooksByGenre = function (genre, page, size) {
                var url = booksConstants.env.apiEndPoint + '/books/?genre=' + genre + '&page=' + page + '&size=' + size;

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get books by genre. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };

            this.getBooksByAuthor = function (author, page, size) {
                var url = booksConstants.env.apiEndPoint + '/books/?author=' + author + '&page=' + page + '&size=' + size;

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get books by author. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };

            this.getBooksByReader = function (reader, page, size) {
                var url = booksConstants.env.secureApiEndPoint + '/books/?reader=' + reader + '&page=' + page + '&size=' + size;

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get books by reader. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };

            this.getBookGenres = function () {
                var url = booksConstants.env.apiEndPoint + '/books/genres';

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get list of book genres. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };

            this.getBookAuthors = function () {
                var url = booksConstants.env.apiEndPoint + '/books/authors';

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get list of book authors. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };

            this.getBookReaders = function () {
                var url = booksConstants.env.secureApiEndPoint + '/books/readers';

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        if (error.status !== 403) {
                            $log.error('Failed to get list of book readers. Error data: ' + JSON.stringify(error));
                            throw error;
                        } else {
                            return [];
                        }
                    });
            };

            this.getGoogleBooks = function (title) {
                var url = booksConstants.env.secureApiEndPoint + '/googlebooks/?title=' + title;

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get google books. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };

            this.saveComment = function (comment, bookId) {

                var url = booksConstants.env.secureApiEndPoint + '/books/' + bookId + '/comments';

                return $http.post(url, comment)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to save a book comment. Error data: ' + JSON.stringify(error));
                        throw error;
                    });

            };
        
            this.deleteComment = function (bookId, commentId) {

                var url = booksConstants.env.secureApiEndPoint + '/books/' + bookId + '/comments/' + commentId;

                return $http.delete(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to delete a book comment. Error data: ' + JSON.stringify(error));
                        throw error;
                    });

            };

        });
}());

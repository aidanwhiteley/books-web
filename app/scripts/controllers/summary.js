/*global angular: false */
(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name booksWebApp.controller:SummaryCtrl
     * @description
     * # SummaryCtrl
     * Controller of the booksWebApp
     */
    angular.module('booksWebApp')
        .controller('SummaryCtrl', function ($scope, $log, $location, $routeParams, $window, $timeout, summaryDataService, bookDataService, booksConstants, menuService) {

            var currentSearchType = 'byBooks',
                currentSearchGenre = '',
                currentSearchAuthor = '',
                currentSearchReader = '',
                currentSearchRating = '',
                currentSearchTerms = '',
                screenWidth = $window.innerWidth;

            $scope.dataRetrievalError = false;
            $scope.bookDeletedOk = false;
            $scope.deletedBook = '';
            $scope.currentPage = 0;

            menuService.setMenuItem(booksConstants.menuItems.SUMMARY);

            $scope.screenWidth = screenWidth;

            $scope.getBooks = function () {
                if (currentSearchType === 'byBooks') {
                    bookDataService.getBooks($scope.currentPage, booksConstants.env.defaultPageSize)
                        .then(
                            function (data) {
                                $scope.data = data;
                            },
                            function () {
                                $log.error('Failed to get book data');
                                $scope.dataRetrievalError = true;
                            }
                        );
                } else if (currentSearchType === 'byRating') {
                    bookDataService.getBooksByRating(currentSearchRating, $scope.currentPage, booksConstants.env.defaultPageSize)
                        .then(
                            function (data) {
                                $scope.data = data;
                            },
                            function () {
                                $log.error('Failed to get book data by rating');
                                $scope.dataRetrievalError = true;
                            }
                        );
                } else if (currentSearchType === 'byGenre') {
                    bookDataService.getBooksByGenre(currentSearchGenre, $scope.currentPage, booksConstants.env.defaultPageSize)
                        .then(
                            function (data) {
                                $scope.data = data;
                            },
                            function () {
                                $log.error('Failed to get book data by genre');
                                $scope.dataRetrievalError = true;
                            }
                        );
                } else if (currentSearchType === 'byAuthor') {
                    bookDataService.getBooksByAuthor(currentSearchAuthor, $scope.currentPage, booksConstants.env.defaultPageSize)
                        .then(
                            function (data) {
                                $scope.data = data;
                            },
                            function () {
                                $log.error('Failed to get book data by authir');
                                $scope.dataRetrievalError = true;
                            }
                        );
                } else if (currentSearchType === 'byReader') {
                    bookDataService.getBooksByReader(currentSearchReader, $scope.currentPage, booksConstants.env.defaultPageSize)
                        .then(
                            function (data) {
                                $scope.data = data;
                            },
                            function () {
                                $log.error('Failed to get book data by reader');
                                $scope.dataRetrievalError = true;
                            }
                        );
                } else if (currentSearchType === 'bySearch') {
                    bookDataService.searchBooks(currentSearchTerms, $scope.currentPage, booksConstants.env.defaultPageSize)
                        .then(
                            function (data) {
                                $scope.data = data;
                            },
                            function () {
                                $log.error('Failed to get search for books');
                                $scope.dataRetrievalError = true;
                            }
                        );
                }
            };

            $scope.getSummaryData = function () {
                summaryDataService.getBooks()
                    .then(
                        function (data) {
                            $scope.summaryData = data;
                        },
                        function () {
                            $log.error('Failed to get summary data');
                            $scope.dataRetrievalError = true;
                        }
                    );
            };

            /**
             * Extract any parameters set by the left hand menu items.
             */
            if ($location.path().indexOf('booksbygenre') >= 0) {
                currentSearchType = 'byGenre';
                currentSearchGenre = $routeParams.genre;
            } else if ($location.path().indexOf('booksbyauthor') >= 0) {
                currentSearchType = 'byAuthor';
                currentSearchAuthor = $routeParams.author;
            } else if ($location.path().indexOf('booksbyreader') >= 0) {
                currentSearchType = 'byReader';
                currentSearchReader = $routeParams.reader;
            } else if ($location.path().indexOf('booksbyrating') >= 0) {
                currentSearchType = 'byRating';
                currentSearchRating = $routeParams.rating;
            } else if ($location.path().indexOf('bookssearch') >= 0) {
                currentSearchType = 'bySearch';
                currentSearchTerms = $routeParams.terms;
            }

            // Iniitialise the page data
            $scope.getBooks();
            $scope.getSummaryData();


            $scope.next = function () {
                if ($scope.data.last !== true) {
                    $scope.currentPage = $scope.currentPage + 1;
                    $scope.getBooks();
                }
            };

            $scope.previous = function () {
                if ($scope.data.first !== true) {
                    $scope.currentPage = $scope.currentPage - 1;
                    $scope.getBooks();
                }
            };

            $scope.toggleSelected = function (book) {
                $scope.data.content.forEach(function (val) {
                    if (val !== book) {
                        val.expanded = false;
                    }
                });
                book.expanded = !book.expanded;

                $scope.bookDeletedOk = false;
                $scope.deletedBook = '';
            };

            $scope.deleteSelected = function (book) {
                bookDataService.deleteBook(book)
                    .then(
                        function () {
                            $scope.getBooks();
                            $scope.bookDeletedOk = true;
                            $scope.deletedBook = book.title;

                        },
                        function () {
                            $log.error('Failed to delete book with id: ' + book.id);
                            $scope.bookDeletedOk = false;
                            $scope.deletedBook = '';
                        }
                    );
            };

            $scope.editSelected = function (book) {
                $location.path('/edit/').search({
                    id: book.id
                });
            };

            $scope.bookDetails = function (book) {
                $location.path('/book/' + book.id);
            };


            /** 
             * Following three methods called from the "stats cards".
             */
            $scope.booksByRating = function (rating) {
                menuService.setMenuItem(booksConstants.menuItems.SUMMARY);
                currentSearchType = 'byRating';
                currentSearchRating = rating;
                $scope.currentPage = 0;
                $scope.getBooks();
                $scope.scrollTo();
            };

            $scope.booksSummary = function () {
                menuService.setMenuItem(booksConstants.menuItems.SUMMARY);
                currentSearchType = 'byBooks';
                $scope.currentPage = 0;
                $scope.getBooks();
                $scope.scrollTo();
            };

            $scope.booksByGenre = function (genre) {
                menuService.setMenuItem(booksConstants.menuItems.SUMMARY);
                currentSearchType = 'byGenre';
                currentSearchGenre = genre;
                $scope.currentPage = 0;
                $scope.getBooks();
                $scope.scrollTo();
            };

            // This isnt currently working reliably
            $scope.scrollTo = function () {
                $timeout(function () {
                    $window.scrollTo(0, 0);
                });

            };

        });
}());

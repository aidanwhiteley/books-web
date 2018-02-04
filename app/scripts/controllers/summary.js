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
        .controller('SummaryCtrl', function ($scope, $log, $location, summaryDataService, bookDataService, booksConstants, menuService) {

            var currentSearchType = 'byBooks', currentSearchRating = '', currentSearchGenre = '';

            $scope.dataRetrievalError = false;
            $scope.bookDeletedOk = false;
            $scope.deletedBook = '';
            $scope.currentPage = 0;

            menuService.setMenuItem(booksConstants.menuItems.SUMMARY);

            $scope.getBooks = function () {
                if (currentSearchType === 'byBooks') {
                    bookDataService.getBooks($scope.currentPage, booksConstants.defaultPageSize)
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
                    bookDataService.getBooksByRating(currentSearchRating, $scope.currentPage, booksConstants.defaultPageSize)
                        .then(
                            function (data) {
                                $scope.data = data;
                            },
                            function () {
                                $log.error('Failed to get book data');
                                $scope.dataRetrievalError = true;
                            }
                        );
                } else if (currentSearchType === 'byGenre') {
                    bookDataService.getBooksByGenre(currentSearchGenre, $scope.currentPage, booksConstants.defaultPageSize)
                        .then(
                            function (data) {
                                $scope.data = data;
                            },
                            function () {
                                $log.error('Failed to get book data');
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

            $scope.booksByRating = function (rating) {
                menuService.setMenuItem(booksConstants.menuItems.RATING);
                currentSearchType = 'byRating';
                currentSearchRating = rating;
                $scope.currentPage = 0;
                $scope.getBooks();
            };

            $scope.booksSummary = function () {
                menuService.setMenuItem(booksConstants.menuItems.SUMMARY);
                currentSearchType = 'byBooks';
                currentSearchRating = '';
                $scope.currentPage = 0;
                $scope.getBooks();
            };

            $scope.booksByGenre = function (genre) {
                menuService.setMenuItem(booksConstants.menuItems.GENRE);
                currentSearchType = 'byGenre';
                currentSearchGenre = genre;
                $scope.currentPage = 0;
                $scope.getBooks();
            };

        });
}());

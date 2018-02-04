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
        .controller('SummaryCtrl', function ($scope, $log, $location, summaryDataService, bookDataService, booksConstants) {

            $scope.dataRetrievalError = false;
            $scope.bookDeletedOk = false;
            $scope.deletedBook = '';
            $scope.currentPage = 0;

            $scope.getBooks = function () {
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
            };
        
            $scope.getSummaryData = function () {
                summaryDataService.getBooks()
                    .then(
                        function (data) {
                            $scope.decodeSummaryData(data);
                        },
                        function () {
                            $log.error('Failed to get summary data');
                            $scope.dataRetrievalError = true;
                        }
                    );
            };

            $scope.getBooks();
            $scope.getSummaryData();
        
            $scope.decodeSummaryData = function (data) {
                var topBookRating, topBookCount, worstBookRating, worstBookCount;
                
                $scope.countBooks = data.count;

                if (data.countGreatBooks > 0) {
                    topBookRating = "great";
                    topBookCount = data.countGreatBooks;
                } else if (data.countGoodBooks > 0) {
                    topBookRating = "good";
                    topBookCount = data.countGoodBooks;
                } else if (data.countOkBooks > 0) {
                    topBookRating = "ok";
                    topBookCount = data.countGoodBooks;
                } else if (data.countPoorBooks > 0) {
                    topBookRating = "poor";
                    topBookCount = data.countPoorBooks;
                } else if (data.countTerribleBooks > 0) {
                    topBookRating = "terrible";
                    topBookCount = data.countTerribleBooks;
                }
                $scope.topBookRating = topBookRating;
                $scope.topBookCount = topBookCount;
                
                if (data.countTerribleBooks > 0) {
                    worstBookRating = "terrible";
                    worstBookCount = data.countTerribleBooks;
                } else if (data.countPoorBooks > 0) {
                    worstBookRating = "poor";
                    worstBookCount = data.countPoorBooks;
                } else if (data.countOkBooks > 0) {
                    worstBookRating = "ok";
                    worstBookCount = data.countGoodBooks;
                } else if (data.countGoodBooks > 0) {
                    worstBookRating = "good";
                    worstBookCount = data.countGoodBooks;
                } else if (data.countGreatBooks > 0) {
                    worstBookRating = "great";
                    worstBookCount = data.countGreatBooks;
                }
                
                $scope.topBookRating = topBookRating;
                $scope.topBookCount = topBookCount;
                
                $scope.worstBookRating = worstBookRating;
                $scope.worstBookCount = worstBookCount;
                
            };

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

        });
}());

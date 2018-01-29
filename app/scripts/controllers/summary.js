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

            /**
             * Get data for summary screen
             */
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

            $scope.getBooks();

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

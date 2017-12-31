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
        .controller('SummaryCtrl', function ($scope, $log, $location, summaryDataService, bookDataService) {
        
            $scope.dataRetrievalError = false;
            $scope.bookDeletedOk = false;
            $scope.deletedBook = '';

            /**
             * Get data for summary screen
             */
            $scope.getSummaryData = function () {

                summaryDataService.getRemoteData()
                    .then(
                        function (data) {
                            $scope.data = data;
                        },
                        function () {
                            $log.error('Failed to get summary data');
                            $scope.dataRetrievalError = true;
                        }
                    );
            };

            $scope.getSummaryData();

            $scope.toggleSelected = function (book) {
                $scope.data.books.forEach(function (val) {
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
                            $log.info('Deleted book ok');
                            $scope.getSummaryData();
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
                console.log('Edit selected');
                $location.path('/edit/').search({id: book.id});
            };

        });
}());

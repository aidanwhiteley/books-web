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
            };
        
            $scope.deleteSelected = function (book) {
                bookDataService.deleteBook(book)
                    .then(
                        function () {
                            $log.info('Deleted book ok');
                            $location.path('#/summary');
                            
                        },
                        function () {
                            $log.error('Failed to delete book with id: ' + book.id);
                        }
                    );
            };

        });
}());

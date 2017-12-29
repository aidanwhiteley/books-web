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
        .controller('SummaryCtrl', function ($scope, $log, $location, summaryDataService) {

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
        
            $scope.capitalizeFilter = function (input) {
                return (input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
            };

        });
}());

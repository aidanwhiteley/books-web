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
        .controller('AddCtrl', function ($scope, $log, bookDataService) {

            $scope.bookCreateOk = false;
            $scope.bookCreateError = false;

            $scope.options = [
                {
                    name: 'Great',
                    value: 5
                },
                {
                    name: 'Good',
                    value: 4
                },
                {
                    name: 'Ok',
                    value: 3
                },
                {
                    name: 'Poor',
                    value: 2
                },
                {
                    name: 'Terrible',
                    value: 1
                }
            ];

            $scope.save = function (book, bookForm) {

                if (bookForm.$valid) {
                    bookDataService.createBook(book)
                        .then(
                            function () {
                                $scope.bookCreateOk = true;
                            },
                            function () {
                                $scope.bookCreateError = true;
                            }
                        );
                }
            };

            //$scope.book = book;

        });
}());

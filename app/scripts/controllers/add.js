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
                    value: 4
                },
                {
                    name: 'Good',
                    value: 3
                },
                {
                    name: 'Ok',
                    value: 2
                },
                {
                    name: 'Poor',
                    value: 1
                },
                {
                    name: 'Terrible',
                    value: 0
                }
            ];

            $scope.save = function (book, bookForm) {

                if (bookForm.$valid) {
                    bookDataService.createBook(book)
                        .then(
                            function () {
                                $scope.bookCreateOk = true;
                                $scope.bookCreateError = false;
                                $scope.book = {};
                                $scope.bookForm.$setPristine();
                                $scope.bookForm.$setUntouched();
                            },
                            function () {
                                $scope.bookCreateError = true;
                                $scope.bookCreateOk = false;
                            }
                        );
                }
            };

        });
}());

/*global angular: false */
(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name booksWebApp.controller:CreateEditCtrl
     * @description
     * # CreateEditCtrl
     * Controller of the booksWebApp
     */
    angular.module('booksWebApp')
        .controller('CreateEditCtrl', function ($scope, $log, $location, bookDataService) {

            $scope.bookCreateOk = false;
            $scope.bookCreateError = false;
            $scope.bookRetrievalError = false;
            $scope.bookUpdateError = false;
            $scope.bookUpdateOK = false;

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
                    if (!book.id) {
                        bookDataService.createBook(book)
                            .then(
                                function () {
                                    $scope.bookCreateOk = true;
                                    $scope.bookCreateError = false;
                                    $scope.bookUpdateError = false;
                                    $scope.bookUpdateOK = false;
                                    $scope.bookRetrievalError = false;
                                    $scope.book = {};
                                    $scope.bookForm.$setPristine();
                                    $scope.bookForm.$setUntouched();
                                },
                                function () {
                                    $scope.bookCreateOk = true;
                                    $scope.bookCreateError = true;
                                    $scope.bookUpdateError = false;
                                    $scope.bookUpdateOK = false;
                                    $scope.bookRetrievalError = false;
                                }
                            );
                    } else {
                        bookDataService.updateBook(book)
                            .then(
                                function () {
                                    $scope.bookCreateOk = false;
                                    $scope.bookCreateError = false;
                                    $scope.bookUpdateError = false;
                                    $scope.bookUpdateOK = true;
                                    $scope.bookRetrievalError = false;
                                },
                                function () {
                                    $scope.bookCreateOk = false;
                                    $scope.bookCreateError = false;
                                    $scope.bookUpdateError = true;
                                    $scope.bookUpdateOk = false;
                                    $scope.bookRetrievalError = false;
                                }
                            );
                    }
                }
            };

            $scope.checkIfExistingBook = function () {

                var idParam = $location.search().id;

                if (idParam && idParam !== '') {
                    bookDataService.getBook(idParam)
                        .then(
                            function (data) {
                                $scope.book = data.data;
                                $scope.bookForm.$setPristine();
                                $scope.bookForm.$setUntouched();
                            },
                            function () {
                                $scope.bookRetrievalError = true;
                                $log.error('Error retrieving book based on parameter ' + idParam);
                            }
                        );
                }
            };

            $scope.checkIfExistingBook();

        });
}());

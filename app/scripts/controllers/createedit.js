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
            $scope.googleMatchesIndex = 0;
<<<<<<< HEAD
            $scope.googleBookData = [];
=======
            $scope.google = {};
>>>>>>> 5fd2c75a1fc0781b3df39f098c35928da46f4cde

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
                                    $scope.bookCreateOk = false;
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

            $scope.searchGoogle = function (book) {

                var trimmedTitle, minumumValidInput = 2;

                // We are only supporting recent browsers
                trimmedTitle = book.title.trim();

                if (trimmedTitle.length > minumumValidInput) {

                    $scope.googleMatchesIndex = 0

                    bookDataService.getGoogleBooks(book.title)
                        .then(
                            function (data) {
<<<<<<< HEAD
                                $scope.googleBookData = data.data.items;
=======
                                $scope.google.books = data.data.items;
                                $scope.book.googleBookId = data.data.items[$scope.googleMatchesIndex].id;
>>>>>>> 5fd2c75a1fc0781b3df39f098c35928da46f4cde
                            },
                            function (errors) {
                                $log.error('Failed to retrieve Google book data: ' + JSON.stringify(errors));
                            }
                        );
                }
            };

            $scope.googleMatchesPlus = function () {
<<<<<<< HEAD
                if ($scope.googleMatchesIndex < ($scope.googleBookData.length - 1)) {
                    $scope.googleMatchesIndex = $scope.googleMatchesIndex + 1;
                    delete $scope.book.googleBookId;
                    $scope.book.foundOnGoogle = false;
=======
                if ($scope.googleMatchesIndex < ($scope.google.books.length - 1)) {
                    $scope.googleMatchesIndex = $scope.googleMatchesIndex + 1;
                    $scope.book.googleBookId = data.data.items[$scope.googleMatchesIndex].id;
>>>>>>> 5fd2c75a1fc0781b3df39f098c35928da46f4cde
                }
            };

            $scope.googleMatchesMinus = function () {
                if ($scope.googleMatchesIndex > 0) {
                    $scope.googleMatchesIndex = $scope.googleMatchesIndex - 1;
<<<<<<< HEAD
                    delete $scope.book.googleBookId;
                    $scope.book.foundOnGoogle = false;
=======
                    $scope.book.googleBookId = data.data.items[$scope.googleMatchesIndex].id;
>>>>>>> 5fd2c75a1fc0781b3df39f098c35928da46f4cde
                }
            };
        
            $scope.googleCheckBoxTicked = function () {
                $scope.book.googleBookId = $scope.googleBookData[$scope.googleMatchesIndex].id;
            };


            $scope.checkIfExistingBook();

        });
}());

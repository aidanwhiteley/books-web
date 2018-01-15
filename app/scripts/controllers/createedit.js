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
        .controller('CreateEditCtrl', function ($scope, $log, $location, $anchorScroll, bookDataService) {

            $scope.bookCreateOk = false;
            $scope.bookCreateError = false;
            $scope.bookRetrievalError = false;
            $scope.bookUpdateError = false;
            $scope.bookUpdateOK = false;
            $scope.googleMatchesIndex = 0;
            $scope.googleBookData = [];

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
                                    
                                    //$location.hash('navbar');
                                    //$anchorScroll();
                                },
                                function () {
                                    $scope.bookCreateOk = false;
                                    $scope.bookCreateError = true;
                                    $scope.bookUpdateError = false;
                                    $scope.bookUpdateOK = false;
                                    $scope.bookRetrievalError = false;
                                    
                                    //$location.hash('navbar');
                                    //$anchorScroll();
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
                                    
                                    //$location.hash('navbar');
                                    //$anchorScroll();
                                },
                                function () {
                                    $scope.bookCreateOk = false;
                                    $scope.bookCreateError = false;
                                    $scope.bookUpdateError = true;
                                    $scope.bookUpdateOk = false;
                                    $scope.bookRetrievalError = false;
                                    
                                    //$location.hash('navbar');
                                    //$anchorScroll();
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

                                $scope.searchGoogle(data.data);
                            },
                            function () {
                                $scope.bookRetrievalError = true;
                                $log.error('Error retrieving book based on parameter ' + idParam);
                            }
                        );
                }
            };

            $scope.searchGoogle = function (book) {

                var trimmedTitle, minumumValidInput = 2, i;

                // We are only supporting recent browsers
                trimmedTitle = book.title.trim();

                if (trimmedTitle.length > minumumValidInput) {

                    $scope.googleMatchesIndex = 0;

                    bookDataService.getGoogleBooks(book.title)
                        .then(
                            function (data) {
                                $scope.googleBookData = data.data.items;

                                // If the passed in "book" has a googleBookId set against it, we now
                                // iterate through the matches to see if we can find it again.
                                // There is a risk that this new Googlr Book serach won't return the
                                // book the user previoulsy selected!
                                if (book.googleBookId && book.googleBookId !== '') {
                                    for (i = 0; i < data.data.items.length; i = i + 1) {
                                        if (data.data.items[i].id === book.googleBookId) {
                                            $scope.googleMatchesIndex = i;
                                            $scope.book.foundOnGoogle = true;
                                        }
                                    }
                                }
                            },
                            function (errors) {
                                $log.error('Failed to retrieve Google book data: ' + JSON.stringify(errors));
                            }
                        );
                }
            };

            $scope.googleMatchesPlus = function () {
                if ($scope.googleMatchesIndex < ($scope.googleBookData.length - 1)) {
                    $scope.googleMatchesIndex = $scope.googleMatchesIndex + 1;
                    delete $scope.book.googleBookId;
                    $scope.book.foundOnGoogle = false;
                }
            };

            $scope.googleMatchesMinus = function () {
                if ($scope.googleMatchesIndex > 0) {
                    $scope.googleMatchesIndex = $scope.googleMatchesIndex - 1;
                    delete $scope.book.googleBookId;
                    $scope.book.foundOnGoogle = false;
                }
            };

            $scope.googleCheckBoxTicked = function () {
                $scope.book.googleBookId = $scope.googleBookData[$scope.googleMatchesIndex].id;
            };


            $scope.checkIfExistingBook();

        });
}());

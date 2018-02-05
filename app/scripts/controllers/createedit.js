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
        .controller('CreateEditCtrl', function ($scope, $log, $location, $anchorScroll, bookDataService, menuService, booksConstants) {

            $scope.bookCreateOk = false;
            $scope.bookCreateError = false;
            $scope.bookRetrievalError = false;
            $scope.bookUpdateError = false;
            $scope.bookUpdateOK = false;
            $scope.googleMatchesIndex = 0;
            $scope.googleBookData = [];

            menuService.setMenuItem(booksConstants.menuItems.ADDBOOK);

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
                                    $scope.resetMessaging();
                                    $scope.bookCreateOk = true;
                                    $scope.book = {};
                                    $scope.bookForm.$setPristine();
                                    $scope.bookForm.$setUntouched();
                                    
                                    // Later decision to go to summary page after creating new book.
                                    // However, above code left in place in case the decision changes!
                                    $location.url('/').replace();
                                    $scope.$apply();
                                },
                                function () {
                                    $scope.resetMessaging();
                                    $scope.bookCreateError = true;
                                }
                            );
                    } else {
                        bookDataService.updateBook(book)
                            .then(
                                function () {
                                    $scope.resetMessaging();
                                    $scope.bookUpdateOK = true;
                                },
                                function () {
                                    $scope.resetMessaging();
                                    $scope.bookUpdateError = true;
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
                                $scope.book = data;
                                $scope.bookForm.$setPristine();
                                $scope.bookForm.$setUntouched();

                                $scope.searchGoogle(data);
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

                // Check that we have some input
                if (book && book.title) {

                    // We are only supporting recent browsers
                    trimmedTitle = book.title.trim();

                    if (trimmedTitle.length > minumumValidInput) {

                        $scope.googleMatchesIndex = 0;

                        bookDataService.getGoogleBooks(book.title)
                            .then(
                                function (data) {
                                    $scope.googleBookData = data.items;

                                    // If the passed in "book" has a googleBookId set against it, we now
                                    // iterate through the matches to see if we can find it again.
                                    // There is a risk that this new Google Book search won't return the
                                    // book the user previously selected!
                                    if (book.googleBookId && book.googleBookId !== '') {
                                        for (i = 0; i < data.items.length; i = i + 1) {
                                            if (data.items[i].id === book.googleBookId) {
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
                }
            };

            $scope.resetMessaging = function () {
                $scope.bookCreateOk = false;
                $scope.bookCreateError = false;
                $scope.bookUpdateError = false;
                $scope.bookUpdateOK = false;
                $scope.bookRetrievalError = false;
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

            // ***** By Genre existing data for typeahead ******
            $scope.getBookGenres = function () {
                bookDataService.getBookGenres()
                    .then(
                        function (data) {
                            $scope.listOfGenres = data;
                        },
                        function (errors) {
                            $log.error('Failed to get list of genres: ' + JSON.stringify(errors));
                        }
                    );
            };

            $scope.getBookGenres();

            $scope.byGenreDisplayText = function (item) {
                return item.genre;
            };

            $scope.byGenreAfterSelect = function (item) {
                $log.debug("Selected: " + item.genre);
            };


        });
}());

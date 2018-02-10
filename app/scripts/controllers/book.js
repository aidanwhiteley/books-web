/*global angular: false, $: false */
(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name booksWebApp.controller:BookCtrl
     * @description
     * # BookCtrl
     * Controller of the booksWebApp
     */
    angular.module('booksWebApp')
        .controller('BookCtrl', function ($scope, $log, $routeParams, bookDataService, userDataService) {

            $scope.id = $routeParams.id;

            if ($routeParams.id && $routeParams.id !== '') {
                bookDataService.getBook($routeParams.id)
                    .then(
                        function (data) {
                            $scope.book = data;
                            $scope.book.displayGooglePreview = data.googleBookDetails.accessInfo.embeddable &&
                                data.googleBookDetails.accessInfo.viewability !== 'NO_PAGES';
                        },
                        function () {
                            $scope.bookRetrievalError = true;
                            $log.error('Error retrieving book based on parameter ' + $routeParams.id);
                        }
                    );
            } else {
                $log.error('Book controller called without a valid id');
            }

            $scope.bookDetails = function () {
                $('#mytabs a:first').tab('show'); // Select first tab
            };

            $scope.bookComments = function () {
                $('#mytabs a:last').tab('show'); // Select last tab
            };

            $scope.getUserData = function () {
                userDataService.getUser()
                    .then(
                        function (data) {
                            $scope.user = data;
                        },
                        function (errors) {
                            if (errors.status !== 403) {
                                $log.error('Failed to get user data: ' + JSON.stringify(errors));
                            }
                            $scope.user = null;
                        }
                    );
            };

            $scope.getUserData();

            $scope.saveComment = function (comment, book, commentsForm) {

                var commentToPost = {};
                commentToPost.comment = comment;

                if (commentsForm.$valid) {

                    bookDataService.saveComment(commentToPost, book.id)
                        .then(
                            function (data) {
                                $scope.book = data;
                            },
                            function () {
                                $scope.commentSaveError = true;
                                $log.error('Error saving book comment ');
                            }
                        );
                }
            };

            $scope.pad = function (str, max) {
                str = str.toString();
                return str.length < max ? $scope.pad('0' + str, max) : str;
            };


        });
}());

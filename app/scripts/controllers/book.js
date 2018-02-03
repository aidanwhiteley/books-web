/*global angular: false, $: false, google: false */
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
        .controller('BookCtrl', function ($scope, $log, $routeParams, bookDataService) {

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
                $('#mytabs a:first').tab('show') // Select first tab
            };

            $scope.bookComments = function () {
                $('#mytabs a:last').tab('show') // Select last tab
            };
        
            

        });
}());

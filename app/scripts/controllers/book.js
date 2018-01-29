/*global angular: false */
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
            $scope.book = bookDataService.getBook($routeParams.id);

            if ($routeParams.id && $routeParams.id !== '') {
                bookDataService.getBook($routeParams.id)
                    .then(
                        function (data) {
                            $scope.book = data.data;
                        },
                        function () {
                            $scope.bookRetrievalError = true;
                            $log.error('Error retrieving book based on parameter ' + $routeParams.id);
                        }
                    );
            } else {
                $log.error('Book controller called without a valid id');
            }

        });


}());

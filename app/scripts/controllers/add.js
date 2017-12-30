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
        .controller('AddCtrl', function ($scope, $log) {
        
            var master;
        
            $scope.options = [
                {name: 'Great', value: 5},
                {name: 'Good', value: 4},
                {name: 'Ok', value: 3},
                {name: 'Poor', value: 2},
                {name: 'Terrible', value: 1}
            ];

            $scope.save = function (book, bookForm) {
                master = angular.copy(book);
                
                $log.info('Form data was: ' + bookForm.$valid);
                $log.info('Saved data: ' + JSON.stringify(master));
            };
        
            //$scope.book = book;

        });
}());

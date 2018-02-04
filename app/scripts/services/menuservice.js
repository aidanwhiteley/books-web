/*global angular: false */
(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name booksWebApp.menuService
     * @description
     * # menuService
     *
     * Service in the booksWebApp.
     */
    angular.module('booksWebApp')
        .service('menuService', function () {
        
            var currentlySelectedMenuItem;

            this.setMenuItem = function (menuItemName) {
                currentlySelectedMenuItem = menuItemName;
            };
        
            this.getMenuItem = function () {
                return currentlySelectedMenuItem;
            };
        

        });
}());

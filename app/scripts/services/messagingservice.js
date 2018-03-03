/*global angular: false */
(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name booksWebApp.messagingService
     * @description
     * # messagingService
     *
     * Service in the booksWebApp.
     */
    angular.module('booksWebApp')
        .service('messagingService', function () {
        
            var latestMessage = '';

            this.setLatestMessage = function (message) {
                latestMessage = message;
            };
        
            this.getLatestMessage = function () {
                return latestMessage;
            };
        
            this.getAndClearLatestMessage = function () {
                var tmpMessage = latestMessage;
                latestMessage = '';
                return tmpMessage;
            };
        });
}());

/*global angular: false */
(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name booksWebApp.summaryDataService
     * @description
     * # summaryDataService
     *
     * Service in the booksWebApp.
     * AngularJS will instantiate a singleton by calling "new" on this function.
     */
    angular.module('booksWebApp')
        .service('summaryDataService', function ($http, $log, booksConstants) {

            this.getBooks = function () {
                var url = booksConstants.apiEndPoint + '/booksstats';

                return $http.get(url)
                    .then(function onSuccess(response) {
                        return response.data;
                    }).catch(function onError(error) {
                        $log.error('Failed to get summary data for books. Error data: ' + JSON.stringify(error));
                        throw error;
                    });
            };
        

        });
}());

/*global angular: false */
(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name booksWebApp.controller:LandingCtrl
     * @description
     * # LandingCtrl
     * Controller of the booksWebApp
     */
    angular.module('booksWebApp')
        .controller('LandingCtrl', function ($scope, $log, $location, $window, bookDataService, summaryDataService, booksConstants, menuService) {

            var bookSlides = [], i, smallWidthDevice = false, booksToShow = 15;

            menuService.setMenuItem(booksConstants.menuItems.LANDING);

            smallWidthDevice = ($window.innerWidth < 500);
            if (smallWidthDevice) {
                booksToShow = 5;
            }

            $scope.getBooks = function () {
                bookDataService.getBooks(0, booksToShow)
                    .then(
                        function (data) {

                            for (i = 0; i < data.content.length; i = i + 1) {
                                if (data.content[i].googleBookDetails && data.content[i].googleBookDetails.volumeInfo &&
                                        data.content[i].googleBookDetails.volumeInfo.imageLinks) {

                                    if (smallWidthDevice) {
                                        if (data.content[i].googleBookDetails.volumeInfo.imageLinks.thumbnail) {
                                            bookSlides.push({
                                                'src': data.content[i].googleBookDetails.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://'),
                                                'caption': data.content[i].title + ' by ' + data.content[i].author,
                                                'id': data.content[i].id
                                            });
                                        }
                                    } else {
                                        if (data.content[i].googleBookDetails.volumeInfo.imageLinks.small) {
                                            bookSlides.push({
                                                'src': data.content[i].googleBookDetails.volumeInfo.imageLinks.small.replace('http://', 'https://'),
                                                'caption': data.content[i].title + ' by ' + data.content[i].author,
                                                'id': data.content[i].id
                                            });
                                        }
                                    }
                                }
                            }

                            $scope.slides = bookSlides;

                            $scope.options = {
                                sourceProp: 'src',
                                visible: bookSlides.length,
                                perspective: 35,
                                startSlide: 0,
                                border: 0,
                                dir: 'rlt',
                                controls: true,
                                width: (smallWidthDevice ? 143 : 300),
                                height: (smallWidthDevice ? 205 : 462),
                                space: (smallWidthDevice ? 110 : 220),
                                loop: true,
                                clicking: true
                            };
                        },
                        function () {
                            $log.error('Failed to get book data');
                            $scope.dataRetrievalError = true;
                        }
                    );
            };

            $scope.getBooks();

            $scope.selectedClick = function (index) {
                $location.path('/book/' + $scope.slides[index].id);
            };

        });
}());

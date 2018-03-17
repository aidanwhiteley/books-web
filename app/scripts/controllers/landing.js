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

            var bookSlides = [], i, smallWidthDevice = false, booksToShow = booksConstants.env.homePageBookImageCount,
                largeDeviceImage, smallDeviceImage;

            menuService.setMenuItem(booksConstants.menuItems.LANDING);

            smallWidthDevice = ($window.innerWidth < booksConstants.env.homePageBookSmallDeviceWidthBreakPoint);
            if (smallWidthDevice) {
                booksToShow = booksConstants.env.homePageBookImageCountSmallDevice;
            }
        
            function findPreferredLargeDeviceImage(data) {
                var preferredImage = '';
                if (data.googleBookDetails.volumeInfo.imageLinks.small) {
                    preferredImage = data.googleBookDetails.volumeInfo.imageLinks.small;
                } else if (data.googleBookDetails.volumeInfo.imageLinks.thumbnail) {
                    preferredImage = data.googleBookDetails.volumeInfo.imageLinks.thumbnail;
                } else if (data.googleBookDetails.volumeInfo.imageLinks.medium) {
                    preferredImage = data.googleBookDetails.volumeInfo.imageLinks.medium;
                } else if (data.googleBookDetails.volumeInfo.imageLinks.large) {
                    preferredImage = data.googleBookDetails.volumeInfo.imageLinks.large;
                } else if (data.googleBookDetails.volumeInfo.imageLinks.smallThumbnail) {
                    preferredImage = data.googleBookDetails.volumeInfo.imageLinks.smallThumbnail;
                }
                
                return preferredImage.replace('http://', 'https://');
            }
        
            function findPreferredSmallDeviceImage(data) {
                var preferredImage = '';
                if (data.googleBookDetails.volumeInfo.imageLinks.thumbnail) {
                    preferredImage = data.googleBookDetails.volumeInfo.imageLinks.thumbnail;
                } else if (data.googleBookDetails.volumeInfo.imageLinks.smallThumbnail) {
                    preferredImage = data.googleBookDetails.volumeInfo.imageLinks.smallThumbnail;
                } else if (data.googleBookDetails.volumeInfo.imageLinks.small) {
                    preferredImage = data.googleBookDetails.volumeInfo.imageLinks.small;
                } else if (data.googleBookDetails.volumeInfo.imageLinks.medium) {
                    preferredImage = data.googleBookDetails.volumeInfo.imageLinks.medium;
                } else if (data.googleBookDetails.volumeInfo.imageLinks.large) {
                    preferredImage = data.googleBookDetails.volumeInfo.imageLinks.large;
                }
                
                return preferredImage.replace('http://', 'https://');
            }

            $scope.getBooks = function () {
                bookDataService.getBooks(0, booksToShow)
                    .then(
                        function (data) {

                            for (i = 0; i < data.content.length; i = i + 1) {
                                if (data.content[i].googleBookDetails && data.content[i].googleBookDetails.volumeInfo &&
                                        data.content[i].googleBookDetails.volumeInfo.imageLinks) {

                                    if (smallWidthDevice) {
                                        smallDeviceImage = findPreferredSmallDeviceImage(data.content[i]);
                                        
                                        if (data.content[i].googleBookDetails.volumeInfo.imageLinks.thumbnail) {
                                            bookSlides.push({
                                                'src': smallDeviceImage,
                                                'caption': data.content[i].title + ' by ' + data.content[i].author,
                                                'id': data.content[i].id
                                            });
                                        }
                                    } else {
                                        largeDeviceImage = findPreferredLargeDeviceImage(data.content[i]);
                                        
                                        if (largeDeviceImage && largeDeviceImage.trim().length !== 0) {
                                            bookSlides.push({
                                                'src': largeDeviceImage,
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

/*global angular: false, $: false */
(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name booksWebApp.controller:MenuCtrl
     * @description
     * # MenuCtrl
     * Controller of the booksWebApp
     */
    angular.module('booksWebApp')
        .controller('MenuCtrl', function ($scope, $log, $location, userDataService, menuService, booksConstants, bookDataService) {

            menuService.setMenuItem(booksConstants.menuItems.ADMINUSERS);

            /**
             * Get user data
             */
            $scope.getUserData = function () {

                userDataService.getUser()
                    .then(
                        function (data) {
                            data.admin = $scope.isAdmin(data);
                            data.editor = $scope.isEditor(data);
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

            $scope.getUsers = function () {

                var i;

                userDataService.getUsers()
                    .then(
                        function (data) {
                            for (i = 0; i < data.length; i = i + 1) {
                                data[i].admin = $scope.isAdmin(data[i]);
                                data[i].editor = $scope.isEditor(data[i]);
                            }
                            $scope.users = data;
                        },
                        function (errors) {
                            $log.error('Failed to get users data: ' + JSON.stringify(errors));
                            $scope.users = {};
                        }
                    );
            };

            $scope.getUserData();

            if ($location.path() === '/users') {
                $scope.getUsers();
            }

            $scope.isAdmin = function (user) {
                return (-1 !== user.roles.indexOf('ROLE_ADMIN'));
            };

            $scope.isEditor = function (user) {
                return (-1 !== user.roles.indexOf('ROLE_EDITOR'));
            };

            $scope.deleteUser = function (user) {

                userDataService.deleteUser(user)
                    .then(
                        function () {
                            $scope.revertMessaging();
                            $scope.msgUserDeleteOK = true;
                            $scope.getUsers();
                        },
                        function (data) {
                            if (data.status === 409) {
                                $scope.revertMessaging();
                                $scope.msgUserDeletedSelfNotAllowed = true;
                            } else {
                                $scope.revertMessaging();
                                $scope.msgUserDeleteNotOK = true;
                            }
                        }
                    );
            };

            $scope.toggleEditor = function (user) {
                user.editor = !user.editor;
                $scope.updatePermissions(user);
            };

            $scope.toggleAdmin = function (user) {
                user.admin = !user.admin;
                $scope.updatePermissions(user);
            };

            $scope.updatePermissions = function (user) {
                userDataService.alterUserPermissions(user)
                    .then(
                        function () {
                            $scope.revertMessaging();
                            $scope.msgUserUpdatedOK = true;
                        },
                        function (data) {
                            if (data.status === 409) {
                                $scope.revertMessaging();
                                $scope.msgUserUpdatedSelfNotAllowed = true;
                            } else {
                                $scope.revertMessaging();
                                $scope.msgUserUpdatedNotOK = true;
                            }
                        }
                    );
            };

            $scope.pad = function (str, max) {
                str = str.toString();
                return str.length < max ? $scope.pad("0" + str, max) : str;
            };

            $scope.revertMessaging = function () {
                $scope.msgUserDeleteOK = false;
                $scope.msgUserDeleteNotOK = false;
                $scope.msgUserUpdatedSelfNotAllowed = false;
                $scope.msgUserDeletedSelfNotAllowed = false;
                $scope.msgUserUpdatedOK = false;
                $scope.msgUserUpdatedNotOK = false;
            };

            $scope.currentMenuItem = function () {
                return menuService.getMenuItem();
            };

            // ***** By Genre ******
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
                return item.genre + ' (' + item.countOfBooks + ' book' + (item.countOfBooks > 1 ? 's' : '') + ')';
            };

            $scope.byGenreAfterSelect = function (item) {
                $location.url('/booksbygenre/?genre=' + encodeURI(item.genre)).replace();
                $scope.$apply();
            };

            $scope.searchByGenre = function () {
                $scope.byGenreInput = '';
                $("#findByGenreInput").removeClass('menuCriteriaInput');
                menuService.setMenuItem(booksConstants.menuItems.GENRE);
            };

            // ***** By Author ******
            $scope.getBookAuthors = function () {
                bookDataService.getBookAuthors()
                    .then(
                        function (data) {
                            $scope.listOfAuthors = data;
                        },
                        function (errors) {
                            $log.error('Failed to get list of authors: ' + JSON.stringify(errors));
                        }
                    );
            };

            $scope.getBookAuthors();

            $scope.byAuthorDisplayText = function (item) {
                return item.author + ' (' + item.countOfBooks + ' book' + (item.countOfBooks > 1 ? 's' : '') + ')';
            };

            $scope.byAuthorAfterSelect = function (item) {
                $location.url('/booksbyauthor/?author=' + encodeURI(item.author)).replace();
                $scope.$apply();
            };

            $scope.searchByAuthor = function () {
                $scope.byAuthorInput = '';
                $("#findByAuthorInput").removeClass('menuCriteriaInput');
                menuService.setMenuItem(booksConstants.menuItems.AUTHOR);
            };
        
        
            // ***** By Reader ******
            $scope.getBookReaders = function () {
                bookDataService.getBookReaders()
                    .then(
                        function (data) {
                            $scope.listOfReaders = data;
                        },
                        function (errors) {
                            $log.error('Failed to get list of readers: ' + JSON.stringify(errors));
                        }
                    );
            };

            $scope.getBookReaders();

            $scope.byReaderDisplayText = function (item) {
                return item.reader + ' (' + item.countOfBooks + ' book' + (item.countOfBooks > 1 ? 's' : '') + ')';
            };

            $scope.byReaderAfterSelect = function (item) {
                $location.url('/booksbyreader/?reader=' + encodeURI(item.reader)).replace();
                $scope.$apply();
            };

            $scope.searchByReader = function () {
                $scope.byReaderInput = '';
                $("#findByReaderInput").removeClass('menuCriteriaInput');
                menuService.setMenuItem(booksConstants.menuItems.READER);
            };
        });
}());

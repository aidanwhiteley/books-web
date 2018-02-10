/*global describe: false, beforeEach: false, afterEach: false, module: false, inject: false, spyOn: false, jasmine: false, getJSONFixture: false, it: false, expect: false */
(function () {

    'use strict';

    describe('Controller: MenuCtrl', function () {

        // load the controller's module
        beforeEach(module('booksWebApp'));

        var controller, scope, log;

        // Initialize the controller and a mock scope and inject services
        beforeEach(inject(function ($controller, $rootScope, $log, $q, booksConstants, userDataService, menuService, bookDataService) {

            scope = $rootScope.$new();
            log = $log;

            // We mock out the HTTP calls in the service methods and
            // load up test JSON (from test/mock directory) into the individual services.
            // Dont know why path must start with base/...
            // See https://stackoverflow.com/questions/17370427/loading-a-mock-json-file-within-karmaangularjs-test
            jasmine.getJSONFixtures().fixturesPath = 'base/test/mock';

            spyOn(userDataService, 'getUser').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve(getJSONFixture('user1.json'));
                return deferred.promise;
            });
            
            spyOn(bookDataService, 'getBookGenres').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve(getJSONFixture('genres1.json'));
                return deferred.promise;
            });
            
            spyOn(bookDataService, 'getBookAuthors').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve(getJSONFixture('authors1.json'));
                return deferred.promise;
            });
            
            spyOn(bookDataService, 'getBookReaders').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve(getJSONFixture('readers1.json'));
                return deferred.promise;
            });

            controller = $controller('MenuCtrl', {
                $scope: scope,
                $log: $log,
                booksConstants: booksConstants,
                userDataService: userDataService,
                menuService: menuService,
                bookDataService: bookDataService
            });

            scope.$digest();

        }));

        // Log angular log messages in Karma
        afterEach(function () {
            //console.log(log.info.logs);
            //console.log(log.warn.logs);
            //console.log(log.error.logs);
        });


        it('should test admin user has all three roles', function () {
            expect(scope.user.roles.length).toBe(3);
        });
        
        it('should find books defined in seven genres', function () {
            expect(scope.listOfGenres.length).toBe(7);
        });
        
        it('should find thirteen different authors', function () {
            expect(scope.listOfAuthors.length).toBe(13);
        });
        
        it('should find just one reader', function () {
            expect(scope.listOfReaders.length).toBe(1);
        });


    });
}());

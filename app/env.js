/*jslint nomen: true*/
(function (window) {
    'use strict';
    
    window.__env = window.__env || {};
    
    // *************************************************************
    // Settings that control the application functionality
    // *************************************************************

    // Endpoint for unsecured API calls.
    // Can be relative path unless using CORS
    window.__env.apiEndPoint = 'http://localhost:8080/api';

    // Endpoint for secured API calls.
    // Can be relative path unless using CORS
    window.__env.secureApiEndPoint = 'http://localhost:8080/secure/api';
    
    // Endpoint for feeds for list of recent changes.
    // Can be relative path unless using CORS
    window.__env.feedsEndPoint = 'http://localhost:8080/feeds';

    // Default page size for results tables
    window.__env.defaultPageSize = 5;

    // Application URL for starting a logon via Google.
    // Can be relative path unless using CORS
    window.__env.logonGoogleEndPoint = 'http://localhost:8080/login/google';
    
    // Application URL for starting a logon via Facebook.
    // Can be relative path unless using CORS
    window.__env.logonFacebookEndPoint = 'http://localhost:8080/login/facebook';
    
    // The URL to initiate logout
    // Can be relative path unless using CORS
    window.__env.logoutEndPoint = "http://localhost:8080/secure/api/logout";
    
    // The URL for app metrics
    // Can be relative path unless using CORS. The trailing slash is important
    window.__env.appMetrics = "http://localhost:8080/actuator/";
    
    // Are we using CORS - normally development only. 
    // If you set this to true there is no XSRF enabled so beware.
    // Use of CORS on production not recommended - see https://github.com/aidanwhiteley/books
    window.__env.useCORS = true;
    
    // *************************************************************
    // Settings that control the application look and feel
    // *************************************************************
    
    // The book club name
    window.__env.applicationName = 'The Something Book Club';
    
    // The book club scope
    window.__env.bookClubmembersScope = 'you know <names of people running book club here>';
    
    // The book club admin / signup email
    window.__env.bookClubAdminEmail = 'example@example.com';
    
    // The book club admin contact email
    window.__env.bookClubContactEmail = 'example@example.com';
    
    // Welcome / intro text
    window.__env.welcomeText = 'Welcome to The Something Book Club!';
    window.__env.welcomeBackText = 'Welcome back. Your last logon was on';
    window.__env.tagLineText = 'Books we\'ve been reading';
    
    // Home page book images to display
    window.__env.homePageBookImageCount = 15;
    window.__env.homePageBookImageCountSmallDevice = 7;
    window.__env.homePageBookSmallDeviceWidthBreakPoint = 500;
    
    

}(this));

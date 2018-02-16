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
    window.__env.logoutEndPoint = "http://localhost:8080/logout";
    
    // Are we using CORS - normally development only
    window.__env.useCORS = true;
    
    // *************************************************************
    // Settings that control the application look and feel
    // *************************************************************
    
    // The book club name
    window.__env.applicationName = 'The Cloudy Book Club';
    
    // The book club scope
    window.__env.bookClubmembersScope = 'you know Aidan or Liz or live in Cockwood';
    
    // The book club admin / signup email
    window.__env.bookClubAdminEmail = 'signup@cloudybookclub.com';
    
    // The book club admin contact email
    window.__env.bookClubContactEmail = 'contact@cloudybookclub.com';
    
    // Welcome / intro text
    window.__env.welcomeText = 'Welcome to The Cloudy Book Club!';
    window.__env.welcomeBackText = 'Welcome back. Your last logon was on';
    window.__env.tagLineText = 'Books we\'ve been reading';
    
    

}(this));

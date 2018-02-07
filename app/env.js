/*jslint nomen: true*/
(function (window) {
    'use strict';
    
    window.__env = window.__env || {};

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
    
    // Are we using CORS - normally development only
    window.__env.useCORS = true;

}(this));

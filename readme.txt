
List of temporary tasks to move to prod
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Change paths to logon links in index.html (relative / no domain & port)
2. Change the apiEndPoint and secureApiEndPoint variables in app.js to be relative (no proptocol, domain or port)
3. Also in app.js, remove $httpProvider.defaults.withCredentials = true;
# books-web

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.

It is the companion project to https://github.com/aidanwhiteley/books which provides the REST bases server side 
implmentation consumed by this Angular 1.x application.

## Build & development

* Run `npm install` followed by
* `bower install`
These assume you recent versions of npm and bower installed. Google is your friend if not.

## Run in development
Run `grunt serve` to run in development / preview mode and get automatic (live) re-loading in the browser as
you change code.

This assumes you have the server side coee running on the same machine and listening on port 8100 (which 
will be the case if running the https://github.com/aidanwhiteley/books project on its default port).

## Configuring for other environments
The grunt based build process merges and minifies all files. However, it leaves the 'env.js' environment specific
configuration file separate (unmerged / unminified) in the root of the distribution directory.
Please edit the env.js file as needed.
At the least, the env.js file is checked in assumimg that development of both the client and server side coce is happening 
on the same machine but on different ports.
Therefore, to run in other environments (where there will, most likely, be a "frotn proxy") you will probbably want to
<ul>
    <li>remove all protocols, domains and ports from the entries in env.js</li>
    <li>that should be it - please let me know if there are other problems!</li>

## Testing
Running `grunt test` will run the unit tests with karma.
### Test environemnt setup
The above command may work for you for no errors or warnings. It imediately didn't work for me. When investigating I ended up running:
npm install grunt-karma -–save-dev
Let me know how you get on - one way or another - and I'll update these instructions.



### Client Side Test Coverage
Its pretty poor! The basic framework for testing Angular based code under Karma / Jasmine is all 
up and working and there are working tests that 
* Test an Angular controller
* Set up and spy on mock objects that stub out the calls to bacd end dataservices and return variousu versions of the expected JSON

That said, there's very little presentation or business logic in this front end sapplication - it is also in the https://github.com/aidanwhiteley/books application.
So, the low test coverage isn't top of the lst of concerns.

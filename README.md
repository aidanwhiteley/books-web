# books-web

This is the companion project to https://github.com/aidanwhiteley/books which provides a REST based server side 
implementation consumed by this Angular 1.x application.

The application is an online, local book club - so nothing too revolutionary here I'm afraid!

## Build & development

This project was generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.

To build run
* `npm install` followed by
* `bower install`

These assume you have recent versions of npm and bower installed. Google is your friend if not.

## Run in development
Run `grunt serve` to run in development / preview mode and get automatic (live) re-loading in the browser as
you change code.

This assumes you have the server side code running on the same machine and listening on port 8100 (which 
will be the case if running the https://github.com/aidanwhiteley/books project on its default port).

## Configuring for other environments
The grunt based build process merges and minifies all files. However, it leaves the 'env.js' environment specific
configuration file separate (unmerged / unminified) in the root of the distribution directory.
Please edit the env.js file as needed.

At the least, the env.js file that is checked in assumes that development of both the client and server side code is happening 
on the same machine but on different ports (and, therefore, needing CORS support).

To run in other environments (where there will, most likely, be a "front proxy" - Zuul, Apogee, ZXTM, Apache, nginx etc) you will probbably want to
* remove all protocols, domains and ports from the entries in env.js
* that should be it - please let me know if there are other problems!

The second half of the env.js file allows you to make look and feel changes e.g. changing the name of the application, who to contact etc

## Testing
Running `grunt test` will run the automated tests using karma and jasmine.

### Test environment setup
The above command may work for you with no errors or warnings. It didn't immediately work for me. When investigating I ended up running:
npm install grunt-karma -–save-dev
Let me know how you get on - one way or another - and I'll update these instructions.

### Client Side Test Coverage
Its pretty poor! The basic framework for testing Angular based code under Karma / Jasmine is all 
up and working and there are working tests that 
* Test an Angular controller
* Set up and spy on mock objects that stub out the calls to back end json dataservices and return various versions of the expected JSON

That said, there's very little presentation or business logic in this front end application - it is all in the service tier application - see https://github.com/aidanwhiteley/books - which does have fairly good test coverage.

So, the low test coverage in this app isn't top of the list of concerns.

## Building for live
Running `grunt` will run the automated tests and then package the code for live (running various merge and minification tasks).

### Live application example
And what does all this effort get you? 

The application should be running at https://cloudybookclub.com/

If you haven't logged on to the application yet, here's a screen grab for what is looked like (from a while back - it is still actively being developed)
![Screen shot](https://github.com/aidanwhiteley/books-web/blob/master/app/images/cloudy-book-club-screen-grab.jpg "Book review")

## Acknowledgements
The UI for this application is based on the free "Paper Dashboard" admin web site template from Creative Tim - available at https://www.creative-tim.com/product/paper-dashboard-angular
and released under the MIT license.

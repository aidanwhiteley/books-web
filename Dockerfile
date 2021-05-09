# Docker file for running web tier of Books AngularJS application on nginx
#
# To build Docker image use:
# a) build application with "grunt --force"
# b) build Docker image with "docker build --rm -t aidanwhiteley/books-web-angular:v0.1.0 ."
# The version number here corresponds to the application version in bower.json
#
# If you want to use an API gateway above the Java microservices edit the commented lines below
# and build an alternative Docker image with the command
# "docker build --rm -t aidanwhiteley/books-web-angular-gateway:v0.1.0 ."
FROM nginx:1.20.0-alpine
#COPY nginx-DOCKER.conf /etc/nginx/nginx.conf
COPY nginx-apigateway-DOCKER.conf /etc/nginx/nginx.conf
ADD dist /var/www/localhost/books/
COPY dist/env-DOCKER.js /var/www/localhost/books/env.js

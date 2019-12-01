# Docker file for running web tier of Books AngularJS application on nginx
#
# To build Docker image use:
# a) build application with "grunt"
# b) build Docker image with "docker build --rm -t aidanwhiteley/books-web-angular ."
FROM nginx:1.17.5-alpine
COPY nginx-DOCKER.conf /etc/nginx/nginx.conf
ADD dist /var/www/localhost/books/
COPY dist/env-DOCKER.js /var/www/localhost/books/env.js

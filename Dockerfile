FROM nginx:1.17.5-alpine
COPY nginx-DOCKER.conf /etc/nginx/nginx.conf
COPY dist/* /var/www/localhost/books/
COPY dist/app/env-DOCKER.js /var/www/localhost/books/app/env.js

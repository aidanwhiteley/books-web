FROM nginx:1.17.5-alpine
COPY nginx-DOCKER.conf /etc/nginx/nginx.conf
ADD dist /var/www/localhost/books/
COPY dist/env-DOCKER.js /var/www/localhost/books/env.js

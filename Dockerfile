FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/* /var/www/localhost/books/

FROM nginx:latest

COPY ./configs/nginx.conf /etc/nginx/conf.d/default.conf
COPY . /www/public

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

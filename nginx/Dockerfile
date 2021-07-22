# production environment
FROM nginx:1.15-alpine

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
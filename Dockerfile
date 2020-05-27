FROM node:10-alpine AS webpack

WORKDIR /home
COPY . . 
RUN npm install
RUN npm run build

FROM opentracing/openresty:0.9.0

EXPOSE 8080

RUN mkdir -p /etc/zipkin-template
COPY nginx/zipkin-config.json /etc/zipkin-template/
COPY nginx/nginx-entrypoint.sh /bin/nginx-entrypoint.sh
RUN chmod +x /bin/nginx-entrypoint.sh
COPY nginx/nginx.conf /usr/local/openresty/nginx/conf/
COPY nginx/.htpasswd /usr/local/openresty/nginx/auth/
COPY --from=webpack /home/build/ /var/www/

ENTRYPOINT [ "/bin/nginx-entrypoint.sh" ]

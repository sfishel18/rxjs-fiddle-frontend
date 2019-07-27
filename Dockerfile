FROM node:10-alpine AS webpack

WORKDIR /home
COPY . . 
RUN npm install
RUN npm run build

FROM openresty/openresty:alpine

EXPOSE 8080

COPY nginx/nginx.conf /usr/local/openresty/nginx/conf/
COPY --from=webpack /home/build/ /var/www/
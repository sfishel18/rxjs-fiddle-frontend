FROM node:10-alpine AS webpack

WORKDIR /home
COPY . . 
RUN npm install
RUN npm run build

FROM nginx:1.15.3-alpine

EXPOSE 8080

COPY nginx/nginx.conf /etc/nginx/
COPY --from=webpack /home/build/ /var/www/
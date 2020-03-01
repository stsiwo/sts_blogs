FROM node:8.16.2-alpine as dev-install

WORKDIR /app
COPY . . 
RUN ["npm", "install"]
# CMD is executed when cotnainer is created

FROM dev-install as development

WORKDIR /app
CMD ["npm", "run", "start-docker"]

FROM dev-install as testing 

WORKDIR /app
ENTRYPOINT ["npx", "jest"]

FROM development as build-staging-local 

WORKDIR /app
RUN ["npm", "run", "build-staging-local"]

FROM development as build-staging 

WORKDIR /app
RUN ["npm", "run", "build-staging"]

FROM development as build 

WORKDIR /app
RUN ["npm", "run", "build"]

FROM nginx:1.17.6-alpine as staging-local

WORKDIR /var/www
COPY --from=build-staging-local /app/dist . 
COPY ./webserver/dev.stsiwo.com /etc/nginx/conf.d/default.conf
COPY ./webserver/dev.api.stsiwo.com /etc/nginx/conf.d/dev.api.stsiwo.com
CMD ["nginx-debug", "-g", "daemon off;"]

FROM nginx:1.17.6-alpine as staging

WORKDIR /var/www
ENV DEBUG=*
COPY --from=build-staging /app/dist . 
COPY ./webserver/dev.stsiwo.com /etc/nginx/conf.d/default.conf
COPY ./webserver/dev.api.stsiwo.com /etc/nginx/conf.d/dev.api.stsiwo.com
CMD ["nginx-debug", "-g", "daemon off;"]

FROM nginx:1.17.6-alpine as production

WORKDIR /var/www
COPY --from=build /app/dist . 
COPY ./webserver/stsiwo.com /etc/nginx/conf.d/default.conf
COPY ./webserver/api.stsiwo.com /etc/nginx/conf.d/api.stsiwo.com


FROM node:8.16.2-alpine as dev-install

WORKDIR /app
COPY . . 
RUN ["npm", "install"]
# CMD is executed when cotnainer is created

FROM node:8.16.2-alpine as development

WORKDIR /app
COPY --from=dev-install /app . 
# temp disable for testing push image in circleci
# RUN source ./env.dev.sh 
CMD ["npm", "run", "start-docker"]

FROM node:8.16.2-alpine as testing 

WORKDIR /app
COPY --from=dev-install /app . 
# CMD is executed when cotnainer is created
ENTRYPOINT ["npx", "jest"]

FROM node:8.16.2-alpine as build-staging-local 

WORKDIR /app
COPY --from=development /app . 
# CMD is executed when cotnainer is created
RUN ["npm", "run", "build-staging-local"]

FROM node:8.16.2-alpine as build-staging 

WORKDIR /app
COPY --from=development /app . 
# CMD is executed when cotnainer is created
RUN ["npm", "run", "build-staging"]

FROM node:8.16.2-alpine as build 

WORKDIR /app
COPY --from=development /app . 
# CMD is executed when cotnainer is created
RUN ["npm", "run", "build"]

FROM nginx:1.17.6-alpine as staging-local

WORKDIR /var/www
COPY --from=build-staging-local /app/dist . 
COPY ./webserver/dev.stsiwo.com /etc/nginx/conf.d/default.conf
COPY ./webserver/dev.api.stsiwo.com /etc/nginx/conf.d/dev.api.stsiwo.com

FROM nginx:1.17.6-alpine as staging

WORKDIR /var/www
COPY --from=build-staging /app/dist . 
COPY ./webserver/dev.stsiwo.com /etc/nginx/conf.d/default.conf
COPY ./webserver/dev.api.stsiwo.com /etc/nginx/conf.d/dev.api.stsiwo.com

FROM nginx:1.17.6-alpine as production

WORKDIR /var/www
COPY --from=build /app/dist . 
COPY ./webserver/stsiwo.com /etc/nginx/conf.d/default.conf
COPY ./webserver/api.stsiwo.com /etc/nginx/conf.d/api.stsiwo.com


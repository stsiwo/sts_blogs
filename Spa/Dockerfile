FROM node:8.16.2-alpine as development
WORKDIR /app

# for 'source' command
# RUN apk add --no-cache bash

COPY . . 

RUN ["npm", "install"]
# CMD is executed when cotnainer is created


FROM node:8.16.2-alpine as testing
WORKDIR /app

COPY --from=development /app . 

RUN source ./env.dev.sh 

# CMD is executed when this 'testing' cotnainer is created
# if you create 'build' container this CMD is not called
CMD ["npm", "start"]


FROM node:8.16.2-alpine as build 
WORKDIR /app

COPY --from=development /app . 

RUN source ./env.prod.sh 

# CMD is executed when cotnainer is created
RUN ["npm", "run", "build"]


FROM nginx:1.17.6-alpine as staging
WORKDIR /var/www

COPY --from=build /app/dist . 

# CMD tail -f /dev/null


FROM nginx:1.17.6-alpine as production
WORKDIR /var/www

COPY --from=build /app/dist . 


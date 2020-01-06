FROM node:8.16.2-alpine as dev-install

WORKDIR /app
COPY . . 
RUN ["npm", "install"]
# CMD is executed when cotnainer is created

FROM node:8.16.2-alpine as development

WORKDIR /app
COPY --from=dev-install /app . 
RUN source ./env.dev.sh 
CMD ["npm", "run", "start-docker"]

FROM node:8.16.2-alpine as testing 

WORKDIR /app
COPY --from=dev-install /app . 
RUN source ./env.dev.sh 
# CMD is executed when cotnainer is created
ENTRYPOINT ["npx", "jest"]

FROM node:8.16.2-alpine as build 

WORKDIR /app
COPY --from=development /app . 
RUN source ./env.prod.sh 
# CMD is executed when cotnainer is created
RUN ["npm", "run", "build"]

FROM nginx:1.17.6-alpine as staging

WORKDIR /var/www
COPY --from=build /app/dist . 

FROM nginx:1.17.6-alpine as production

WORKDIR /var/www
COPY --from=build /app/dist . 


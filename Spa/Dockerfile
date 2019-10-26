FROM node:10.16-alpine as development
WORKDIR /app

COPY ./package.json ./package.json

RUN ["npm", "install"]
# CMD is executed when cotnainer is created
CMD ["npm", "start"]


FROM ... as staging


FROM ... as production



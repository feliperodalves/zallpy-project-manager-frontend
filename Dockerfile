FROM node:12.10.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn

EXPOSE 80

CMD ["yarn", "start"]

ARG NODE_VERSION=20.14.0

# Base stage: Set up the base image
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

COPY . .
COPY .env.example .env
RUN yarn install

RUN yarn build

ENV NODE_ENV development
USER node

EXPOSE 3000

CMD ["yarn", "start"]


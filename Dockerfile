# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.14.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

FROM base as deps
COPY package.json ./
RUN yarn install --development

FROM deps as build
COPY . .
COPY .env.example .env
RUN yarn install

RUN yarn run build
FROM base as final
ENV NODE_ENV development
USER node
COPY .env.example .env
COPY package.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public
EXPOSE 3000
CMD ["yarn", "start"]


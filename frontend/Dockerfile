FROM node:16.9.1-bullseye

WORKDIR /usr/app
COPY package*.json ./
EXPOSE 3080

ENV NODE_ENV=development
RUN npm install
COPY . ./

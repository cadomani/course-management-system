FROM node:16.9.1-bullseye as base

WORKDIR /usr/app
COPY package*.json ./
EXPOSE 3070

FROM base as production
RUN npm ci
COPY . ./
CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . ./
CMD ["nodemon", "bin/www"]

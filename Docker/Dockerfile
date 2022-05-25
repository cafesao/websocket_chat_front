FROM node:16 as build

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

FROM nginx
COPY --from=build app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/local.crt /etc/nginx/ssl/local.crt
COPY ./nginx/local.key /etc/nginx/ssl/local.key

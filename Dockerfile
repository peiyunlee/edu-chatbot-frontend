FROM node:14-alpine3.15 as build-stage

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn run build


FROM nginx:1.21.5-alpine as production-stage

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
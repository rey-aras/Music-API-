FROM asia.gcr.io/reyinfra/reybase14:latest as build-env
WORKDIR /var/www
COPY . /var/www

RUN npm install
RUN npm run build
RUN npm prune --production
RUN cp -a ./node_modules ./build
RUN cp -a ./database ./build

FROM gcr.io/distroless/nodejs:14 as release
WORKDIR /app

COPY --from=build-env ./var/www/build ./
COPY svc_account.json /etc/rey/gcloud/svc_account.json
COPY .env ./.env

EXPOSE 8080
CMD ["."]
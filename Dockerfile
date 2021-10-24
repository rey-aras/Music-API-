FROM asia.gcr.io/reyinfra/reybase:latest as build-env

WORKDIR /var/www
COPY .env /var/www/.env
COPY . /var/www
# COPY svc_account.json /etc/rey/gcloud/svc_account.json

RUN npm install
RUN npm run build
RUN npm prune --production

RUN cp -a ./node_modules ./build
RUN cp ./.env ./build
RUN cp -a ./database ./build

FROM gcr.io/distroless/nodejs:12
COPY --from=build-env ./var/www/build /app
WORKDIR /app

EXPOSE 8080
CMD ["."]
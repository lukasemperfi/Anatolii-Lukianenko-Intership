FROM node:alpine as appbuild

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm config set cache /tmp --global

COPY --from=appbuild . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]
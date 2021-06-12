FROM node:lts

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci

COPY . .

EXPOSE ${PORT}

CMD npm start

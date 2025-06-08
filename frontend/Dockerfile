FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache --virtual .build-deps python3 make g++ && \
    npm install && \
    apk del .build-deps

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
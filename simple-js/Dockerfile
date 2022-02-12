FROM node:16-alpine3.14

RUN apk update && \
    apk upgrade && \
    apk add ca-certificates && \
    update-ca-certificates && \
    apk add tzdata && \
    rm -rf /var/cache/apk/*

ENV TZ=Asia/Novosibirsk

WORKDIR /usr/src/app
COPY . .

COPY package*.json ./

RUN npm install

CMD [ "npm", "start" ]

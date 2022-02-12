FROM node:16-alpine3.14

RUN apk update && \
    apk upgrade && \
    apk add ca-certificates && \
    update-ca-certificates && \
    apk add tzdata

RUN rm -rf /var/cache/apk/*
ENV TZ=Asia/Novosibirsk

WORKDIR /usr/src/app
COPY . .

COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install && \
    npm install typescript -g && \
    tsc

CMD [ "node", "dist/main.js" ]

FROM node:latest

RUN mkdir -p /app

WORKDIR /app 

COPY package.json /app   
COPY package-lock.json /app

RUN npm install

ENV NODE_ENV production
ENV HOST 0.0.0.0

COPY . /app

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]

FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

ENV NODE_ENV production

CMD ["npm", "start"]
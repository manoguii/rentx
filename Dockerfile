FROM node:latest


WORKDIR /usr/app

COPY package.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 3333

CMD ["pnpm","dev"]

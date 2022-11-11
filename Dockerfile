FROM node:18

WORKDIR /home/app

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

RUN yarn install

COPY . .

RUN npx prisma generate
RUN npx prisma db push

RUN yarn build

EXPOSE 3001

CMD ["yarn", "start:prod"]
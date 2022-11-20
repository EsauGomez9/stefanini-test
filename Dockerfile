FROM node:18 AS builder

WORKDIR /home/app

COPY . .
RUN yarn install
RUN yarn test
RUN yarn build

FROM node:18 AS final

WORKDIR /home/app

COPY --from=builder ./home/app/lib ./lib
COPY package.json .
COPY yarn.lock .
COPY prisma ./prisma

RUN yarn install --production
RUN npx prisma generate

CMD [ "yarn", "prod:prisma:migrate" ]
### build stage

FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY firebase-service-account.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npm run build

### production stage

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/firebase-service-account.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]

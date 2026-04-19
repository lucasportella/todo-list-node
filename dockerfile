FROM node:24-alpine

WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN cp -r /app/src/database/migrations /app/dist/database/migrations
RUN cp -r /app/src/database/seeds /app/dist/database/seeds
RUN echo "==== DEBUG ====" && ls -la
EXPOSE 3002

ENTRYPOINT [ "node", "./dist/server.js" ]

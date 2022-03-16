FROM node:14-slim AS BUILD

WORKDIR /build
COPY package*.json ./
RUN npm install
COPY . .
RUN npx cds build --production
RUN npx cds deploy --to sqlite

FROM node:14-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY .cdsrc.json ./
COPY --from=BUILD /build/sqlite.db ./
COPY --from=BUILD /build/gen/srv ./

EXPOSE 4004
USER node
CMD [ "npm", "start" ]

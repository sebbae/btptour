FROM node:14-slim AS people-build
WORKDIR /build
COPY apps/people/package*.json ./
RUN npm install
COPY apps/people ./
RUN npm run build

FROM node:14-slim AS final
WORKDIR /app
COPY ./deployer/package.json .
RUN npm install --production
COPY --from=people-build /build/dist /app/resources/people
CMD [ "npm", "start" ]

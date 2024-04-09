FROM node:slim

WORKDIR /app/data/db
COPY fakedata.js .
COPY index.js .
COPY package.json .
COPY package-lock.json .

RUN npm i

EXPOSE 8989
CMD ["node", "index.js"]


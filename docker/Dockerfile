FROM node:18

COPY package*.json ./
COPY .env ./

COPY src/ ./src/
COPY server.ts ./
COPY app.ts ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

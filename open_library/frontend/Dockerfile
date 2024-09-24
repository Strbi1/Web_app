FROM node:21-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g npm@10.8.1
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm install
COPY . .
RUN npm run build
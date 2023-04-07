# ==== CONFIGURE =====

FROM node:alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
EXPOSE 8901
CMD ["npm", "run", "build"]
FROM node:17
WORKDIR /povio-new-task
COPY package.json .
RUN npm install
COPY . .
CMD npm start
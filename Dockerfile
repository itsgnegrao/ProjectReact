FROM node:10.15.3

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . /app

# start app
CMD ["npm", "start"]    
FROM node:14
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . /app

# start app
CMD ["npm", "start"]    
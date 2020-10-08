# Step 1
FROM node:10.15.3

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app
COPY package-lock.json ./app
RUN npm install --silent

# add app
COPY . /app

# start app
CMD ["npm", "start"]    
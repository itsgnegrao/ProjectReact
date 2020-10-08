# Step 1
FROM node:10.15.3

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . /app
RUN npm run build

# Stage 2
# FROM nginx:1.17.1-alpine
# COPY --from=build-step /app/build /usr/share/nginx/html
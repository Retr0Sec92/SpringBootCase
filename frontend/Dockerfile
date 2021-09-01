FROM node:11.13.0-alpine

RUN mkdir /frontend

WORKDIR /frontend

RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /frontend/
RUN npm install

# expose 5000 on container
EXPOSE 3000

ENV HOST 0.0.0.0
EXPOSE 3000

# start the app
CMD [ "npm", "run", "dev" ]
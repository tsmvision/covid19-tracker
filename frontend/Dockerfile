FROM node:12

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install 
RUN npm rebuild node-sass

EXPOSE 3000
CMD [ "npm", "start" ]
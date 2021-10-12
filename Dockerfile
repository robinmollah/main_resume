FROM node:14
WORKDIR /usr/src/app

# where available (npm@5+)
COPY package*.json ./

RUN npm install
# RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/app

EXPOSE 8082
CMD [ "node", "bin/www" ]

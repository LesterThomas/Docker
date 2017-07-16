# Set the base image to Ubuntu
FROM    node:latest

# File Author / Maintainer
MAINTAINER Lester Thomas

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl && \
    apt-get -y install python build-essential


# Install nodemon
RUN npm install -g nodemon

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/


# Define working directory
WORKDIR /src
ADD . /src

# Expose port
EXPOSE  80

# Run app using nodemon
CMD ["node", "/src/index.js"]





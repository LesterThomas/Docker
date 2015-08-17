# Set the base image to Ubuntu
FROM    ubuntu

# File Author / Maintainer
MAINTAINER Anand Mani Sankar

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup | sudo bash - && \
    apt-get -y install python build-essential nodejs

# Install nodemon
RUN npm install -g nodemon

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# Define environment variable (this is the hostname that will be added to the Nginx configuration)
ENV VIRTUAL_HOST=localhost

# Define working directory
WORKDIR /src
ADD . /src

VOLUME /home/lester/Documents/Docker/Auto-Ngnix/node/public:/src/public

# Expose port
EXPOSE  80

# Run app using nodemon
CMD ["node", "/src/index.js"]





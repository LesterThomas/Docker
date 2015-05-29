FROM ubuntu
MAINTAINER Lester Thomas <lesterthomas@hotmail.com>
LABEL Description="Simple test image that runs a webserver using node.js to display a simple Hello World message." Vendor="Lester Thomas" Version="1.0"

RUN \
	apt-get update && \
	apt-get install -y nodejs npm git git-core && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/* && \
	mkdir git && \
	cd git && \
	git clone https://github.com/LesterThomas/HelloWorld && \
	cd HelloWorld && \
	npm install

EXPOSE 3000

CMD ["nodejs","/git/HelloWorld/app.js"]

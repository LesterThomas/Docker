HelloWorld-Docker example
=========================

This is a very simple example of a `node.js` webserver running inside Docker. The webserver itself uses the `express` module and simply displays `Hello World!`.

The clever part is packaging this into a Docker container and running it.

There are two approaches to building this, listed below:

A. Manually installing into a container
---------------------------------------

The base container for this uses the `ubuntu` container. I then created a `nodejs` container on top of this (that included `nodejs`, `npm` and `git`). I then created a `helloworld` container on top of this that had this HelloWorld webserver installed. Finally I ran it (mapping the port of the web server to the host machine). The commands were as follows:


Step 1. Download the `ubuntu` container that will be the starting point

```
docker pull ubuntu
```


Step 2. Open a `bash` shell in the `ubuntu` container to install nodejs, npm and git

```
docker run -i -t ubuntu /bin/bash
```


Step 3. Inside the container, install nodejs, npm and git:

```
apt-get update
apt-get install -y nodejs npm git git-core
```


Step 4. Commit the result to a new container `lesterthomas/nodejs`

```
docker ps -l
docker commit 4dc lesterthomas/nodejs   <-the 4dc were the first 3 chars returned from the docker ps -l command ->
```


Step 5. Open a `bash` shell in the `nodejs` container to install the Hello World web server

```
docker run -i -t lesterthomas/nodejs /bin/bash
```


Step 6. Inside the container, clone the `Git` repository and install the package

```
mkdir git
cd git
git clone https://github.com/LesterThomas/HelloWorld
cd HelloWorld
npm install
```


Step 7. Commit the result to a new container `lesterthomas/helloworld`

```
docker ps -l
docker commit 6ec lesterthomas/helloworld   <-the 6ec were the first 3 chars returned from the docker ps -l command ->
```


B. Using a Dockerfile
---------------------

With this method, all the build instructions are loaded into a text file `Dockerfile` and a single command builds this into a container:

```
docker build -t lesterthomas/helloworld .
```

The build command looks in the current directory for a text file named `Dockerfile`.


Running the Container
---------------------

To run the container (mapping the port 3000 from the container to the host machine):

For manually created container:
```
docker run -h helloworld --name helloworldcontainer -p 3000:3000 lesterthomas/helloworld nodejs /git/HelloWorld/app.js
```

For container created using a Dockerfile, there is no need to tell the container what application to run, since this was built using the `CMD` function of the Dockerfile:
```
docker run -h helloworld --name helloworldcontainer -p 3000:3000 lesterthomas/helloworld
```


Save your container to the Docker repository
--------------------------------------------

Push the new containers to the Docker repository

```
docker push lesterthomas/nodejs
docker push lesterthomas/helloworld
```

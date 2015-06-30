Automated configuration of NGiNX to load-balance across an unspecified number of nodes
======================================================================================

This example shows how to automatically create the Nginx configuration to load-balance across a number of application containers.

The work here is based on an excellent blog post from [![Jason Wilder](http://jasonwilder.com/blog/2014/03/25/automated-nginx-reverse-proxy-for-docker/)] and uses his [![Docker-Gen](https://github.com/jwilder/docker-gen)] module to update the Nginx configuration.


The example has:

1. Nginx reverse-proxy acting as a load-balancer.
2. Any number of Nodejs application servers. The example application server simply displays the number of page-views (stored in Redis).
3. A Redis key-value database.


Start Nginx reverse-proxy
-------------------------

```
docker run -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock  -t jwilder/nginx-proxy
```

Start Redis
-----------

```
docker run -d --name redis -p 6379:6379 redis
```


Start N x Application nodes
---------------------------

To notify the Docker-Gen module that this node should be added to the load-balanced traffic, simply supply a `VIRTUAL_HOST` environment variable with the ip address or domain name of the server.

```
docker run -d  -v /home/lester/Documents/Docker/Auto-Ngnix/node/public:/src/public --link redis:redis lesterthomas/appserver:1.0
```





Load tests
----------

using CURL:
for i in `seq 1 20000`; do curl http://localhost; echo '\n'; done

Using Apache:
ab -n 2000 -c 10 http://localhost/



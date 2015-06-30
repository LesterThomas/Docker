# docker-loghose

Simple utility container to collect the logs from all docker containers and expose them as a simple REST service (available at http://localhost:4000/logs). Based on  https://github.com/mcollina/docker-loghose


## Docker Usage

```
docker run -d --restart="always" -p 4000:4000 --privileged -v /var/run/docker.sock:/var/run/docker.sock lesterthomas/loghose:1.0
```





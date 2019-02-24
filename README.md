# Jokes coding challenge

## Dependencies
This project was built using docker and docker-compose.

## Run
```
export EXTERNAL_IP=$(docker-machine ip)
docker-compose up
```
App will be running at ${docker-machine ip}:8080. In my case, it is running at http://192.168.99.100:8080/

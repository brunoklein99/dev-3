#!/bin/sh

docker rm -f academia-api
docker build . -t academia-api
docker run --network host -it -p 8080:8080 -v academia-maven:/root/.m2 --name academia-api academia-api

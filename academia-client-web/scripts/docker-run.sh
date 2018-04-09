#!/bin/sh

docker rm -f academia-client-web
docker build . -t academia-client-web
docker run -it -p 3000:3000 -v $(pwd):/app --name academia-client-web academia-client-web

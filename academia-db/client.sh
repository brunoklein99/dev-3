#!/bin/bash

MYSQL_USER=academia
CLIENT_CONTAINER=academia-mysql-client
SERVER_CONTAINER=academia-mysql
IMAGE=mysql:5.7.21

docker rm -f $CLIENT_CONTAINER

docker run \
  -it \
  --rm \
  --link $SERVER_CONTAINER:$SERVER_CONTAINER \
  --name $CLIENT_CONTAINER \
  mysql:5.7.21 \
  mysql -h${SERVER_CONTAINER} -u${MYSQL_USER} -p

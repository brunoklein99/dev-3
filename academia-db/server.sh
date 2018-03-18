#!/bin/bash

CONTAINER=academia-mysql
IMAGE=mysql:5.7.21

docker run \
  -d \
  --name $CONTAINER \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=academia \
  -e MYSQL_DATABASE=academia \
  -e MYSQL_USER=academia \
  -e MYSQL_PASSWORD=academia \
  $IMAGE

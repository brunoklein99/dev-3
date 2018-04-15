#!/bin/sh

set -e
yarn install
yarn run build

set +e
docker rmi -f academia-client-web-prod:latest

set -e
docker build -f scripts/Dockerfile-prod -t academia-client-web-prod:latest .

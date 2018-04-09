#!/bin/sh

mvn clean install
java -jar target/academia-api-1.0-SNAPSHOT.jar

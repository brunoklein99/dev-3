#!/bin/bash

# tenta apagar um container pré-existente. Se não existir, esse comando irá falhar, mas não tem problema
docker rm -f academia-mysql-client

# usuário e senha são "academia"
docker run -it --rm --link academia-mysql:academia-mysql --name academia-mysql-client mysql:5.7.21 mysql -hacademia-mysql -uacademia -p

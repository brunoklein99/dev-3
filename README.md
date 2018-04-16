# abc academia

## rodando docker

Se você for rodar o sistema com Docker, é necessário primeiro criar a rede virtual do Docker, rodando o script:

```shell
./scripts/docker-network.sh
```

ou rodando o conteúdo dele diretamente

Cada parte da aplicação contém seu README com mais informações de como rodar, mas basicamente:

- rode o banco:

  ```shell
  cd academia-db
  ./server.sh
  ```

- rode a API:

  ```shell
  cd academia-api
  ./scripts/docker-run.sh
  ```

- rode o cliente web:
  ```shell
  cd academia-client-web
  ./scripts/docker-run-dev.sh # se você for desenvolver e quiser ver as alterações sendo refletidas na aplicação
  # ou
  ./scripts/docker-run-prod.sh # se você só quiser rodar
  ```

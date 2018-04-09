# academia-client-web

Cliente web que consome dados da API.


## rodando com docker

É a forma recomendada de rodar, já que só exige Docker instalado na máquina.

Rode o script (a partir da raíz do projeto `academia-client-web`):

```
# se o script for incompatível com seu SO, copie os comandos do script e os execute diretamente
./scripts/docker-run.sh
```

A aplicação irá subir no endereço [http://localhost:3000]()


## rodando localmente

Se você não quiser rodar com Docker, pode rodar diretamente no seu SO.

### pré-requisitos

É necessário ter [nodejs](https://nodejs.org/en/) instalado, na versão especificada no arquivo `.nvmrc`.

### instalando dependências

```
npm install # instala dependências descritas no arquivo package.json
```

### rodando a app

```
npm start
```

A aplicação irá subir no endereço [http://localhost:3000]()

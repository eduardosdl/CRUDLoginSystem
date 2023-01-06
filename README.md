# English
## Login System with the functions:

- Create account
- Login
- Edit profile
- Delete account

## technologies used:

- NodeJS base to backend
- MySQL database
- Architecture MVC (Model, View, Controller)
- Passport to persist login data

## To use:
- Donwload repositorie

- add file '.env' with the variables on root folder of project
```
    SESSION_SECREt=<random_characters>
    MYSQL_HOST=<mysql_host>
    MYSQL_USER=<mysql_user>
    MYSQL_PASSWORD=<mysql_password>
    MYSQL_DATABASE=<mysql_database>
```

- create an new database, with command:
```
    create database <mysql_databse>;
```

- if necessary edit the port in the end file /src/server.js
- run the commands below with terminal open in the folder
```
    npm install
    
    node src/server
```

# Português
## Sistema de Login com as funções:

- Criar uma conta
- Efetuar login
- Atualizar dados de uma conta
- Ao apagar uma conta

## Desenvolvido utilizando:
- NodeJS como base para sistema backend
- MySQL como banco de dados
- Arquitetura MVC (Model, View, Controller)
- Passport para persistir os dados de login

## Para Usar:
- Faça o download do repositório

- Crie o arquivo '.env' na pasta raiz do projeto
```
    SESSION_SECREt=<caracteres_aleatorios>
    MYSQL_HOST=<host_do_mysql>
    MYSQL_USER=<usuario_do_mysql>
    MYSQL_PASSWORD=<senha_do_mysql>
    MYSQL_DATABASE=<nome_do_banco_de_dados>
```

- Crie um novo banco de dados, com o comando
```
    create database <nome_do_banco_de_dados>;
```

- Caso queira altere a porta no final do arquivo /src/server.js
- execute os seguintes comandos com a pasta aberta no terminal
```
    npm install
    
    node src/server
```
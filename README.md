# English
## Login System created to be CRUD:

- Create: create account
- Read: login
- Update: edit profile
- Delete: delete account

## technologies used:

- NodeJS base to backend
- MySQL database
- Architecture MVC (Model, View, Controller)

## To use:
- Donwload repositorie
- create an new database, with command:
###
    create database [database name];

- add your user, password and the name of the created database in the file /src/config/database.js:
###
    username: '[username]',
    password: '[password',
    database: '[database name]'

- if necessary edit the port in the end file /src/server.js
- run the commands below with terminal open in the folder
###
    npm install
    
    node src/server


# Português
## Sistema de Login desenvolvido no intuito de criar um CRUD:

- Create: ao criar uma conta
- Read: ao efetuar login
- Update: ao atualizar dados de uma conta
- Delete: ao apagar uma conta

## Desenvolvido utilizando:
- NodeJS como base para sistema backend
- MySQL como banco de dados
- Arquitetura MVC (Model, View, Controller)

## Para Usar:
- Faça o download do repositório
- Crie um novo banco de dados, com o comando
###
    create database [nome do banco];

- Adicione seu usuário, senha e o nome do banco de dados no arquivo /src/config/database.js
###
    username: '[nome de usuario do banco]',
    password: '[senha do usuario do banco',
    database: '[nome do banco de dados criado]'

- Caso queira altere a porta no final do arquivo /src/server.js
- execute os seguintes comandos com a pasta aberta no terminal
###
    npm install
    
    node src/server

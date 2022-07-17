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

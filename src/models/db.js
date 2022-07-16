// requisição de modulos
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

// gera a conexão do sequelize como banco
const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;
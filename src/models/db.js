// requisição de modulos
const Sequelize = require('sequelize');
require('dotenv').config();

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

// gera a conexão do sequelize como banco
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: MYSQL_HOST,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  define: {
      timestamps: true
  },
});

module.exports = sequelize;
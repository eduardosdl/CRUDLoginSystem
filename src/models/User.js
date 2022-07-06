// importando sequelize
const Sequelize = require('sequelize');
// importando conexão com o banco
const db = require('./db');

// definindo tabela
const User = db.define('User', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING
    }
});

User.sync().then(() => {
    console.log('Banco de dados conectado');
}).catch((err) => {
    console.log('Houv um erro: '+err);
})
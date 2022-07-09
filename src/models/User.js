// importando sequelize
const Sequelize = require('sequelize');
// importando conexão com o banco
const db = require('./db');

// definindo tabela
const User = db.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

User.sync().then(() => {
    console.log('Banco de dados conectado');
}).catch((err) => {
    console.log('Houv um erro: '+err);
})

module.exports = User;
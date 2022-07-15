const routes = require('express').Router();
const UserController = require("../controller/UserCotroller");
const passport = require('passport');
const { userLogado } = require('../helpers/userLogado');

routes.post('/login', UserController.login);

routes.get('/logado', userLogado, UserController.logado);

routes.get('/sair', userLogado, UserController.sair);

routes.post('/logado/alter/:campo', userLogado, UserController.alter)

routes.post('/logado/delete', userLogado, UserController.deleted)

routes.get('/register', UserController.register);

routes.post('/registered', UserController.registered);

module.exports = routes;

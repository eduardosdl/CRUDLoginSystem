const routes = require('express').Router();
const UserController = require("../controller/UserCotroller");

routes.post('/login', UserController.validate);

routes.get('/create', UserController.newUser);

routes.post('/created', UserController.created);

module.exports = routes;

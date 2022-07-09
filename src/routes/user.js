const routes = require('express').Router();
const UserController = require("../controller/UserCotroller");

routes.post('/login', UserController.validate);

routes.get('/register', UserController.register);

routes.post('/registered', UserController.registered);

module.exports = routes;

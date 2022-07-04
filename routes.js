const express = require('express');
const UserController = require("./controller/UserCotroller");
const routes = express.Router();
// const app = express();

/* app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); */

routes.get('/', UserController.home);


routes.post('/login', UserController.validate);

routes.get('/newuser', UserController.newuser);

routes.post('/created', UserController.created)

module.exports = routes;

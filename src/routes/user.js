const router = require('express').Router();
const UserController = require("../controller/UserCotroller");
const passport = require('passport');
const { userConnected } = require('../helpers/userConnected');

// rota para efetuar login -> post - /user/login
router.post('/login', UserController.login);

// rota para informações da conta -> get - /user/conncted - privada
router.get('/connected', userConnected, UserController.connected);

// rota para desconectar -> get - /user/sair - privada
router.get('/exit', userConnected, UserController.exit);

// rota para envio de alteração -> post - /user/connected/alter/:data - privada
router.post('/connected/alter/:data', userConnected, UserController.alter)

// rota para excluir a conta -> post - /user/connected/delete - privada
router.post('/connected/delete', userConnected, UserController.deleted)

// rota para carregar o form de registro de usuario -> get - /user/register
router.get('/register', UserController.register);

// rota para cadastrar usuario no banco -> post - /user/registered
router.post('/registered', UserController.registered);

module.exports = router;

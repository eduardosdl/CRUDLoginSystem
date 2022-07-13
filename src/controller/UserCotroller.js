const bodyParser = require('body-parser');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');


// rota para efetuar login ->  post /user/login
const login = (req, res, next) => {
    // chama o passport para fazer a autenticação
    passport.authenticate('local', {
        successRedirect: '/user/logado',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
}

// rota para carregar informaçoes do user -> get /user/logado
const logado = (req, res) => {
    res.render('pages/user', {user: req.user, campo: req.query.campo });
}

// rota para desconectar o user -> get /user/sair
const sair = (req, res, next) => {
    // função que faz a desconexão
    req.logout((err) => { 
        if(err) {
            return next(err);
        } 
    });
    // redirecionamento
    res.redirect('/')
}


// rota carregar o formulario de cadastro -> get /user/register
const register = async (req, res) => {
    res.render('pages/new')
}

// rota para cadastro do user -> post /user/registered
const registered = async (req, res) => {
    // validação de senha
    if(req.body.password != req.body.password2) {
        req.flash('error_msg', 'As senhas são diferentes');
        res.redirect("/user/register");
    }else {
        // consulta ao banco para para ver se ja existe o usuario
        const consulta = await User.findOne({
            attributes: ['username'],
            where: {
                username: req.body.username
            }
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno');
            res.redirect("/user/register");
            console.log(err);
        });

        // informa que o usuário ja existe
        if(consulta) {
            req.flash('error_msg', 'Já exite uma conta com esse usuário');
            res.redirect('/user/register');
        } else {
            // objeto para criação do usuário
            const newUser = {
                name: req.body.nome,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }

            // gerador de hash para a senha
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) {
                        req.flash('error_msg', 'Houve um erro interno');
                        res.redirect("/user/register");
                    }

                    // salva o hash no lugar da senha original
                    newUser.password = hash;

                    // cria o usuário no banco de dados
                    User.create(newUser).then(() => {
                        req.flash('success_msg', 'Conta criada com sucesso, faça login');
                        res.redirect("/");
                    }).catch((err) => {
                        req.flash('error_msg', 'Houve um erro ao criar o usuario, tente novamente');
                        res.redirect('/user/register');
                        console.log('houve um erro: '+err);
                    });
                });
            });
        }

    }
}

module.exports = {
    login,
    logado,
    sair,
    register,
    registered
}
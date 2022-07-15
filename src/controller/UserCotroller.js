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

const alter = async (req, res) => {
    const user = await User.findByPk(req.user.id);
    // const salt = await bcrypt.genSalt(10);
    const campoalt = req.params.campo;
    let newValue;

    console.log(campoalt)
    campoalt == 'email'? newValue = req.body.email : 
    campoalt == 'username'? newValue = req.body.username :
    campoalt == 'name'? newValue = req.body.name : newValue = req.body.newpassword
    console.log(newValue)

    if(campoalt == 'username') {
        const consulta = await User.findOne({
            attributes: ['username'],
            where: {
                username: req.body.username
            }
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno');
            res.redirect(`/user/logado/?campo=${campoalt}`);
            console.log(err);
        });

        if(consulta) {
            req.flash('error_msg', 'Já exite uma conta com esse usuário');
            res.redirect(`/user/logado/?campo=${campoalt}`);
            return
        }
    }

    if(campoalt == 'password') {
       if(req.body.newpassword != req.body.newpassword2) {
            req.flash('error_msg', 'As senhas são diferentes');
            res.redirect(`/user/logado/?campo=${campoalt}`);
            return
        }

        console.log(newValue)

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newValue, salt);

        newValue = hash;
    }
    
    console.log(newValue);

    bcrypt.compare(req.body.password, user.password, (err, match) => {
        if(match) {
            User.update({ [campoalt]: newValue}, {
              where: {
                  username: req.user.username
                }
            }).then(() => {
                req.flash('success_msg', `${campoalt} alterado com sucesso`);
                res.redirect(`/user/logado`);
            }).catch(() => {
                req.flash('error_msg', 'Houve um erro interno, tente novamente');
                res.redirect(`/user/logado/?campo=${campoalt}`);
            });
        }else{
            req.flash('error_msg', 'Senha incorreta');
            res.redirect(`/user/logado/?campo=${campoalt}`);
        }
    });
}

const deleted = async (req, res) => {
    const user = await User.findByPk(req.user.id);

    bcrypt.compare(req.body.password, user.password, (err, match) => {
        if(match) {
            User.destroy ({
                where: {
                    id: req.user.id
                }
            });

            req.flash('success_msg', 'Conta apagada com sucesso');
            res.redirect("/");
        } else {
            req.flash('error_msg', 'senha incorreta');
            res.redirect("/user/logado/?campo=delete");
        }
    });
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
    alter,
    deleted,
    register,
    registered
}
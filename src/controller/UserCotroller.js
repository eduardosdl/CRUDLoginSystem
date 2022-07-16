// importação de modulos
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');


// rota para efetuar login ->  post - /user/login
const login = (req, res, next) => {
    // chama o passport para fazer a autenticação
    passport.authenticate('local', {
        successRedirect: '/user/connected',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
}

// rota para carregar informaçoes do user -> get - /user/logado
const connected = (req, res) => {
    res.render('pages/user', {user: req.user, data: req.query.data});
}

// rota para desconectar o user -> get - /user/exit
const exit = (req, res, next) => {
    // função que faz a desconexão
    req.logout((err) => { 
        if(err) {
            return next(err);
        } 
    });
    // redirecionamento
    res.redirect('/')
}

// rota para alterar dados ->  post - /user/connected/alter/:data
const alter = async (req, res) => {
    const user = await User.findByPk(req.user.id);
    const dataAlt = req.params.data;
    let newValue;

    // informa qual sera o valor do newValue de acordo com o dado a ser alterado
    dataAlt == 'username'? newValue = req.body.username :
    dataAlt == 'email'? newValue = req.body.email : 
    dataAlt == 'name'? newValue = req.body.name : newValue = req.body.newpassword;

    if(dataAlt == 'username') {
        // consulta o banco para saber se n há user repetido
        const consulta = await User.findOne({
            attributes: ['username'],
            where: {
                username: req.body.username
            }
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno');
            res.redirect(`/user/connected/?data=${dataAlt}`);
            console.log(err);
        });

        // caso haja retorno da consulta informa o erro
        if(consulta) {
            req.flash('error_msg', 'Já exite uma conta com esse usuário');
            res.redirect(`/user/connected/?data=${dataAlt}`);
            return
        }
    }

    if(dataAlt == 'password') {
        // verifica se as duas senhas são iguais
       if(req.body.newpassword != req.body.newpassword2) {
            req.flash('error_msg', 'As senhas são diferentes');
            res.redirect(`/user/connected/?data=${dataAlt}`);
            return
        }

        // gera o hash da senha nova e armazena na variavel newValue
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newValue, salt);
        newValue = hash;
    }

    // compara a senha escrita com a senha atual da conta
    bcrypt.compare(req.body.password, user.password, (err, match) => {
        if(match) {
            // caso seja igual executa a tualização
            User.update({ [dataAlt]: newValue}, {
              where: {
                  username: req.user.username
                }
            }).then(() => {
                req.flash('success_msg', `${dataAlt} alterado com sucesso`);
                res.redirect(`/user/connected`);
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro interno, tente novamente');
                res.redirect(`/user/connected/?data=${dataAlt}`);
                console.log(err);
            });
        }else{
            // caso não seja retorna erro
            req.flash('error_msg', 'Senha incorreta');
            res.redirect(`/user/connected/?data=${dataAlt}`);
        }
    });
}

// rota para apagar usuario ->  post - /user/connected/delete
const deleted = async (req, res) => {
    const user = await User.findByPk(req.user.id);

    // compara a senha escrita com a senha usuario
    bcrypt.compare(req.body.password, user.password, (err, match) => {
        if(match) {
            // caso sejam iguais apaga a conta
            User.destroy ({
                where: {
                    id: req.user.id
                }
            });

            req.flash('success_msg', 'Conta apagada com sucesso');
            res.redirect("/");
        } else {
            // caso não sejam iguais informam erro
            req.flash('error_msg', 'senha incorreta');
            res.redirect("/user/connected/?data=delete");
        }
    });
}

// rota carregar o formulario de cadastro -> get - /user/register
const register = async (req, res) => {
    res.render('pages/new');
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
                        console.log(`Houve um erro: ${err}`);
                    });
                });
            });
        }

    }
}

module.exports = {
    login,
    connected,
    exit,
    alter,
    deleted,
    register,
    registered
}
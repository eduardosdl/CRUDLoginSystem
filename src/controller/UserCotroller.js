const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const User = require('../models/User');


// rota post /user/login
const validate = async (req, res) => {
    const user = req.body;

    const conta = await User.findAll({
        attributes: ['password'],
        where: {
            username: user.username
        }
    });

    console.log(conta[0].dataValues.password);

    if (user.password === conta[0].dataValues.password) {
        res.render('pages/user', {user: req.body});
    } else {
        res.redirect('/');
    }
}  

// rota get /user/register
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
        const consulta = await User.findAll({
            attributes: ['username'],
            where: {
                username: req.body.username
            }
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno');
            res.redirect("/user/register");
            console.log(err);
        });

        if(consulta.length > 0) {
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
    validate,
    register,
    registered
}
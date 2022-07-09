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

// rota post /user/registered
/* const registered = async (req, res) => {
    const dados = req.body;
    
    console.log(dados);

    User.create({
        name: req.body.nome,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).then(() => {
        res.render("/");
        console.log('criado com sucesso');
    }).catch((err) => {
        console.log('houve um erro: '+err);
        res.render("pages/new", {msg: "erro ao adiconar no banco"})
    }); 
}*/

const registered = async (req, res) => {
    if(req.body.password != req.body.password2) {
        req.flash('error_msg', 'As senhas são diferentes');
        res.redirect("/user/register");
    }else {
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

        console.log(consulta);

        if(consulta.length > 0) {
            req.flash('error_msg', 'Já exite uma conta com esse usuário');
            res.redirect('/user/register');
        } else {
            User.create({
                name: req.body.nome,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }).then(() => {
                req.flash('success_msg', 'Conta criada com sucesso, faça login');
                res.redirect("/");
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro interno');
                res.redirect('/user/register');
                console.log('houve um erro: '+err);
            }); 
        }

    }
}

module.exports = {
    validate,
    register,
    registered
}
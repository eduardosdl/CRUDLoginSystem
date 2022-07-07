const bodyParser = require('body-parser');
const User = require('../models/User');

const register = async (req, res) => {
    res.render('pages/new', {msg: ""});
}

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

const created = async (req, res) => {
    const dados = req.body;
    
    console.log(dados);

    User.create({
        name: req.body.nome,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).then(() => {
        res.render("pages/user", {user: req.body});
        console.log('criado com sucesso');
    }).catch((err) => {
        console.log('houve um erro: '+err);
        res.render("pages/new", {msg: "erro ao adiconar no banco"})
    });
}

module.exports = {
    validate,
    register,
    created
}
// importação de modulos
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    // faz a conexão do usuario e configura a sessão para que continue conectado
    passport.use(new localStrategy({usernameField: 'username'}, (username, password, done) => {
        // procura no banco de dados o usuario informado
        User.findOne({where: {username: username}}).then((user) => {
            // se não existir retorno informa erro
            if(!user) {
                return done(null, false, {message: "Essa conta não existe"});
            }

            // compara a senha do banco de dados com a senha informada
            bcrypt.compare(password, user.password, (err, match) => {
                if(match) {
                    return done(null, user);
                }else{
                    return done(null, false, {message: "Senha incorreta"});
                }
            });

        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.dataValues.id);
    });

    passport.deserializeUser((id, done) => {
        User.findByPk(id).then((user) => {
            done(null, user);
        }).catch((err) => {
            console.log(err);
            done(err, null);
        });
    });
}
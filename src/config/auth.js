const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    passport.use(new localStrategy({usernameField: 'username'}, (username, password, done) => {
        User.findOne({where: {username: username}}).then((user) => {
            
            if(!user) {
                return done(null, false, {message: "Essa consta não existe"});
            }

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
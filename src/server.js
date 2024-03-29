// requisição de modulos
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const passport = require('passport');

const user = require('./routes/user');

require('./config/auth')(passport);
require('dotenv').config();

const app = express();

// config
// session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// middlewares
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    // armazena as variaveis do user logado
    res.locals.user = req.user || null;
    next();
});
// requisição de dados
app.use(express.urlencoded({extended: true}));
// ejs
app.set('view engine', 'ejs');
// public
app.use(express.static(path.join(__dirname, 'public')));
// redirecionamento da viwes
app.set('views', path.join(__dirname, 'views'));
// 

// routes
// rota principal/inicial
app.get('/', (req, res) => res.render("pages/index"));
// rotas de usuário -> /user/...
app.use('/user', user);

// localhost
const port = 3000;
app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}/`);
});
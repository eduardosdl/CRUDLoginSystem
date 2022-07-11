// requisição de modulos
const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const path = require('path');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/auth')(passport);

// config
// session
app.use(session({
    secret: "dhfphefnsdk",
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
    res.locals.user = req.user || null;
    next();
});
// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// ejs
app.set('view engine', 'ejs');
// public
app.use(express.static(path.join(__dirname, 'public')));
// redirecionamento da viwes
app.set('views', path.join(__dirname, 'views'));
// 

// routes
app.get('/', (req, res) => res.render("pages/index"));
app.use('/user', user);


// localhost
const port = 3000;
app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}/`);
});
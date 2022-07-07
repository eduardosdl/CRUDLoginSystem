// requisição de modulos
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const user = require('./routes/user');

// config
// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// ejs
app.set('view engine', 'ejs');
// public
app.use(express.static(path.join(__dirname, 'public')));
// redirecionamento da viwes
app.set('views', path.join(__dirname, 'views'));
// mysql

// routes
app.get('/', (req, res) => res.render("pages/index"));
app.use('/user', user);


// localhost
const port = 3000;
app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}/`);
});
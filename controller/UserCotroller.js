const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const home = async (req, res) => {
    res.render("pages/index");
}


const validate = async (req, res) => {
    const user = req.body.username;
    console.log(user);
    res.render("pages/user", {name: user});
}
  
const newuser = async (req, res) => {
    res.render('pages/new');
}

const created = async (req, res) => {
    const user = req.body.email;
    console.log(user);
    res.render("pages/user", {name: user});
}

module.exports = {
    home,
    validate,
    newuser,
    created
}
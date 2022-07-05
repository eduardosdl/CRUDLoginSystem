const express = require('express');
const bodyParser = require('body-parser');

const newUser = async (req, res) => {
    res.render('pages/new');
}

const validate = async (req, res) => {
    

    res.render("pages/user", {user: req.body});
}  

const created = async (req, res) => {

    res.render("pages/user", {user: req.body});
}

module.exports = {
    validate,
    newUser,
    created
}
module.exports = {
    userLogado: (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
        // req.flash('error_msg', 'Você não é autenticado');
        // res.redirect('')
    }
    
}
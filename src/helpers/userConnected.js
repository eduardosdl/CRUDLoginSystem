module.exports = {
    // função que testa se tem algum usuário conectado
    userConnected: (req, res, next) => {
        // se for altenticado ele passa
        if(req.isAuthenticated()){
            return next();
        }
        // se n for informa erro
        req.flash('error_msg', 'Você precisa estar logado para acessar');
        res.redirect('/')
    }
    
}
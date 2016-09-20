var AuthenticationController = require('./controllers/authentication'),  
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport');
      
var TRINTA = 30 * 60 * 1000;
	  
// autenticacao para proteger as rotas desejadas
var requireAuth = passport.authenticate('jwt', { session: false });  
var requireLogin = passport.authenticate('local', { session: false });
 
module.exports = function(app) {  
      // cria grupo de rotas
      var apiRoutes = express.Router(),
          authRoutes = express.Router();

      console.log("entrou no registro de rotas");

      // adiciona rotas de autorizacao em no subgrupo auth
      apiRoutes.use('/auth', authRoutes);

      // rota de cadastro
      authRoutes.post('/register', AuthenticationController.register);

      // rota de login
      authRoutes.post('/login', requireLogin, AuthenticationController.login);

      // protege o get de dashboard com JWT
      authRoutes.get('/getUser', requireAuth, function(req, res) {  
            var user = req.user;
            
            // se passou 30 min. volta erro.
            var newDate = new Date();
            if (((newDate) - user.ultimo_login) > TRINTA)            
                  return res.status(401).send({ mensagem: 'Sessão inválida.'});
            res.send(user);
      });

      // Set url for API group routes
      app.use('/api', apiRoutes);
};
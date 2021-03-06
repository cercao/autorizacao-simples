var jwt = require('jsonwebtoken'),  
      crypto = require('crypto'),
      User = require('../models/user'),
      config = require('../config/main');

function generateToken(user) {  
  return jwt.sign(user, config.secret, {
    expiresIn: 100800 // em segundos
  });
}

// para não trafegar informações desnecessárias, seta apenas infos usadas
function setUserInfo(request) {  
  return {
    _id: request._id,
    nome: request.nome,    
    email: request.email,
    telefones: request.telefones,
    data_criacao: request.data_criacao,
    data_alteracao: request.data_alteracao,
    ultimo_login: request.ultimo_login
  };
}

// rota para login
exports.login = function(req, res, next) {
  
  console.log("entrou no login");
  var user = req.user;
  
  // atualiza ultimo login
  user.ultimo_login = new Date();
  
  var userInfo = setUserInfo(user);

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });
};

// rota para cadastro
exports.register = function(req, res, next) {  
	console.log("entrou no cadastro");

  // validacoes
  var email = req.body.email;
  var nome = req.body.nome;  
  var senha = req.body.senha;
  
  if (req.body.telefones)
    console.log("tem telefones");

  // retorna erro se nao passou email
  if (!email) {
    return res.status(422).send({ mensagem: 'Favor inserir o email.'});
  }

  // retorna erro se nao passou nome
  if (!nome) {
    return res.status(422).send({ mensagem: 'Favor inserir o nome completo.'});
  }

  // retorna erro se nao passou 
  if (!senha) {
    return res.status(422).send({ mensagem: 'Favor inserir a senha.' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // se já existe, mostra erro
      if (existingUser) {
        return res.status(422).send({ mensagem: 'Este email já está sendo usado.' });
      }

      // se o email ainda nao existe e passou a senha, cria usuario
      var user = new User({
        email: email,
        senha: senha,
        telefones: req.body.telefones,
        data_criacao: new Date(),
        data_alteracao: new Date(),
        ultimo_login: new Date(),             
        nome: nome
      });
      
      // grava jwt no banco
      //user.token = generateToken(user);

      user.save(function(err, user) {
        if (err) { return next(err); }

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsvarter(user.email);

        // Respond with JWT if user was created

        var userInfo = setUserInfo(user);

        res.status(201).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo
        });
      });
  });
};
  

const passport = require('passport'),  
      User = require('../models/user'),
      config = require('./main'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');
	  
// usar email ao invés do username
const localOptions = { usernameField: 'email', passwordField: "senha" }; 

// configurando login local (documentacao do passaport)
const localLogin = new LocalStrategy(localOptions, function(email, senha, done) {  
  console.log("entrou no local strategy");
  console.log("aplicando strategia local, senha:" + senha);
  User.findOne({ email: email }, function(err, user) {
    if(err) { return done(err); }
    if(!user) { return done(null, false, { mensagem: 'Não foi possível verificar login. Tente novamente.' }); }

    console.log("encontrou usuario:" + email);
    user.comparePassword(senha, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false, { mensagem: "Usuário e/ou senha inválidos" }); }

      return done(null, user);
    });
  });
});

const jwtOptions = {  
  // seta no passport a autorizacao JWT no header
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // seta a secret key
  secretOrKey: config.secret
};

// configura estratégia JWT
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {  
  console.log("entrou no jwtLogin");
  console.log("payload: " + JSON.stringify(payload));
  
  User.findById(payload._id, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// habilita passaport para usar as estrategias criadas
passport.use(jwtLogin);  
passport.use(localLogin); 
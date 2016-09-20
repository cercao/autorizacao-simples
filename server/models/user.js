var mongoose = require('mongoose'),  
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs');
	  
var UserSchema = new Schema({  
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  senha: {
    type: String,
    required: true
  },  
  nome: { type: String },    
  telefones : [{
    numero : { type: String },
    ddd : { type: String },
  }],
  data_criacao: {type: Date},
  data_alteracao: {type: Date},
  ultimo_login: {type: Date},
  token: { type: String }
},
{
  timestamps: true
});

// Pre-salva o usuario usando criptografia
UserSchema.pre('save', function(next) {  
  var user = this,
        SALT_FACTOR = 5;

  if (!user.isModified('senha')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.senha, salt, null, function(err, hash) {
      if (err) return next(err);
      user.senha = hash;
      next();
    });
  });
});

// compara senha
UserSchema.methods.comparePassword = function(candidatePassword, cb) {  
  console.log("entrou no compare:" + candidatePassword);
  bcrypt.compare(candidatePassword, this.senha, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
// Importing Node modules and initializing Express
const express = require('express'),  
      app = express(),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      mongoose = require('mongoose'),
      config = require('./config/main'),
	  router = require('./router');  

mongoose.connect(config.database);  

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  

// middleware para tratamentos de erros
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({mensagem: "Alguma coisa deu errado!", erro: err.stack});
});

// validações iniciais
app.all('/*', function(req, res, next) {      
    console.log("entrou no middleware");
    // para todas as chamadas, seta que a resposta deverá ser json
    res.setHeader('Content-Type', 'application/json');
    
    // Proximo
    next();

});

// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

router(app);

app.all('*', function(req, res) {
    throw new Error("Bad request")
})

app.use(function(e, req, res, next) {
    if (e.message === "Bad request") {
        res.status(400).send({ mensagem: "Rota não encontrada!"});
    }
});

// se deu erro de rota não encontrada,
app.use(function(req, res, next) {
  res.status(404).send({ mensagem: "Rota não encontrada!"});
});


// Start the server
const server = app.listen(config.port);  
console.log('Server rodando na porta: ' + config.port + '.');  
var request = require("request"),
    config = require('./config/main');

console.log("Iniciando testes unitarios.. \n");

var token = "";
var ambiente = ""

// pega argumentos
process.argv.forEach(function (val, index, array) {
  if (index == 2)
    ambiente = val;
});


/******************/
/**** CADASTRO ****/
/******************/
var cadastrar = function(callbackOK){
  
  
  var options = { method: 'POST',
  url: 'http://' + ambiente +'/api/auth/register',
  headers: 
   { 'cache-control': 'no-cache',
     'content-type': 'application/json' },
  body: 
   { email: 'lucas_exemplo@gmail.com',
     senha: 'teste',
     nome: 'Name',
     telefones: [ { numero: '1111111', ddd: '222' } ] },
  json: true };
  
  console.log("======= TESTE 1 ======== \n" + options.method + ": " + options.url);

  request(options, function (error, response, body) {
    if (error) console.log("ERRO: " + error);
      
    console.log("resposta: \n" + JSON.stringify(body) + " \n");         
    
    if (callbackOK)
      callbackOK();
  });
};

/***************/
/**** LOGIN ****/
/***************/
var efetuarLogin = function(callbackOK){
    
    
var options = { method: 'POST',
  url: 'http://' + ambiente + '/api/auth/login',
  headers: 
   { 'cache-control': 'no-cache',
     'content-type': 'application/json' },
  body: { email: 'lucas_exemplo@gmail.com', senha: 'teste' },
  json: true };

  console.log("======= TESTE 2 ======== \n" + options.method + ": " + options.url);
  
  request(options, function (error, response, body) {
    if (error) 
      console.log("ERRO: " + error);
      
    console.log("resposta: \n" + JSON.stringify(body) + " \n");
    token = body.token;    
    
    if(callbackOK)
      callbackOK();
  });      
};


/*************/
/**** GET ****/
/*************/
var efetuarGET = function(callbackOK){
  
  
  var options = { method: 'GET',
  url: 'http://' + ambiente + '/api/auth/getUser',
  headers: 
   {'cache-control': 'no-cache',
     authorization: token } };

  console.log("======= TESTE 3 ======== \n" + options.method + ": " + options.url );

  request(options, function (error, response, body) {
    if (error) 
      console.log("ERRO: " +error);
      
    console.log("resposta: \n" + body);

    if(callbackOK)
      callbackOK();
  });

};

// chama testes assincronos e termina no fim
cadastrar(function(){
  efetuarLogin(function(){
    efetuarGET(function(){ process.exit(0); });
  });
});

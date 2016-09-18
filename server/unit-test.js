var request = require("request"),
    config = require('./config/main');

console.log("Iniciando testes unitarios.. \n");

var token = "";


/******************/
/**** CADASTRO ****/
/******************/
var cadastrar = function(callbackOK){
  var options = { method: 'POST',
    url: 'http://localhost:'+config.port+'/api/auth/register',
    headers: 
    { 'content-type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache' },
    form: 
    { email: 'cercaoc@gmail.com',
      senha: 'teste',
      nome: 'Lucas',
      telefones: [ { numero: "111111111", ddd: "111"} ] } };

  console.log("======= TESTE 1 ======== \n" + options.method + ": " + options.url);
  request(options, function (error, response, body) {
    if (error) 
      console.log("ERRO: " + error);
      
    console.log("resposta: \n" + body + " \n");         
    
    if (callbackOK)
      callbackOK();
  });
}

/***************/
/**** LOGIN ****/
/***************/
var efetuarLogin = function(callbackOK){
    
  var options = { method: 'POST',
    url: 'http://localhost:'+config.port+'/api/auth/login',
    headers: 
    { 'content-type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache' },
    form: { email: 'cercaoc@gmail.com', senha: 'teste' } };

  console.log("======= TESTE 2 ======== \n" + options.method + ": " + options.url);

  request(options, function (error, response, body) {
    if (error) 
      console.log("ERRO: " + error);
      
    console.log("resposta: \n" + body + " \n");
    token = JSON.parse(body).token;    
    
    if(callbackOK)
      callbackOK();
  });
}


/*************/
/**** GET ****/
/*************/
var efetuarGET = function(callbackOK){
  var options = { method: 'GET',
    url: 'http://localhost:'+config.port+'/api/auth/dashboard',
    headers: 
    { 
      'cache-control': 'no-cache',
      authorization: token },
    form: { email: 'cercaoc@gmail.com', password: 'teste' } };

  console.log("======= TESTE 3 ======== \n" + options.method + ": " + options.url );

  request(options, function (error, response, body) {
  if (error) 
      console.log("ERRO: " +error);
      
    console.log("resposta: \n" + body);

    if(callbackOK)
      callbackOK();
  });

}

// chama testes assincronos e termina no fim
cadastrar(function(){
  efetuarLogin(function(){
    efetuarGET(function(){ process.exit(0); });
  });
});

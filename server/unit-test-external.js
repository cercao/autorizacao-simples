var request = require("request");   

console.log("Iniciando testes unitarios de fora da aplicação.. \n");

var token = "";


/******************/
/**** CADASTRO ****/
/******************/
var cadastrar = function(callbackOK){
  var options = { method: 'POST',
    url: 'http://52.67.118.78/api/auth/register',
    headers: 
    { 'content-type': 'application/json',
      'cache-control': 'no-cache' },
    form: 
    { email: 'lucas@gmail.com',
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
};

/***************/
/**** LOGIN ****/
/***************/
var efetuarLogin = function(callbackOK){
    
  var options = { method: 'POST',
    url: 'http://52.67.118.78/api/auth/login',
    headers: 
    { 'content-type': 'application/json',
      'cache-control': 'no-cache' },
    form: { email: 'lucas@gmail.com', senha: 'teste' } };

  console.log("======= TESTE 2 ======== \n" + options.method + ": " + options.url);

  request(options, function (error, response, body) {
    if (error) 
      console.log("ERRO: " + error);
      
    console.log("resposta: \n" + body + " \n");
    token = JSON.parse(body).token;    
    
    if(callbackOK)
      callbackOK();
  });
};


/*************/
/**** GET ****/
/*************/
var efetuarGET = function(callbackOK){
  var options = { method: 'GET',
    url: 'http://52.67.118.78/api/auth/getUser',
    headers: 
    { 
      'cache-control': 'no-cache',
      authorization: token },
    form: { email: 'lucas@gmail.com', password: 'teste' } };

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

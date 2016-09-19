# autorizacao-simples
Simples exemplo de autorização usando Node, Express e Mongo

# Dependências
- npm 2.15.9;
- node 4.5.0;
- gulp 3.9.1;
- mongodb 3.0

# Instruções
Faça pull do repositório, instale globalmente o npm, nodemon e gulp. Depois execute o seguinte comando:
```sh
$ npm install
```
Para rodar a aplicação é o seguinte:
```sh
$ gulp
```
Este processo deverá garantir as dependências, rodar o JSHint uma vez, configurar a atualização automática (que rodará o JSHint sempre que atualizar também) e rodar a aplicação. Caso você queira apenas executar, basta usar o comando 'gulp run' ou apenas usar nodemon index.js.

## Deploy
Fiz o deploy na instância 52.67.118.78 da aws ec2.
Os métodos rest expostos são:
- Cadastro de usuários: http://52.67.118.78/api/auth/register
- Login: http://52.67.118.78/api/auth/login
- Busca usuário: http://52.67.118.78/api/auth/getUser

## Teste
Os testes unitários estão em 2 arquivos na raiz da aplicação server:
- unit-test.js (para teste local);
- unit-test-external.js (para teste apontando para a aws);
Usei apenas um simples script em node para executar os teste da API. Para rodar, basta usar o próprio node ou o nodemon assim:
```sh
$ nodemon unit-test.js
```
ou
```sh
$ nodemon unit-test-external.js
```
Este script executa métodos básicos expostos: register, login, getUser
Este aqui é o resultado dos testes apontando para aws:
```sh
$ nodemon unit-test-external.js
[nodemon] 1.10.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node unit-test-external.js`
Iniciando testes unitarios de fora da aplicação..

======= TESTE 1 ========
POST: http://52.67.118.78/api/auth/register
resposta:
{"token":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2RmNDJhOWRhYTFhMzE0NGIwZjU2MWQiLCJub21lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsImlhdCI6MTQ3NDI0OTM4NSwiZXhwIjoxNDc0MjU5NDY1fQ.0Gbg21BW6UCAIN-Rc1ft7smoo_wWFkABFyFfpBfPOnA","user":{"_id":"57df42a9daa1a3144b0f561d","nome":"Lucas","email":"lucas@gmail.com"}}

======= TESTE 2 ========
POST: http://52.67.118.78/api/auth/login
resposta:
{"token":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2RmNDJhOWRhYTFhMzE0NGIwZjU2MWQiLCJub21lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsImlhdCI6MTQ3NDI0OTM4NSwiZXhwIjoxNDc0MjU5NDY1fQ.0Gbg21BW6UCAIN-Rc1ft7smoo_wWFkABFyFfpBfPOnA","user":{"_id":"57df42a9daa1a3144b0f561d","nome":"Lucas","email":"lucas@gmail.com"}}

======= TESTE 3 ========
GET: http://52.67.118.78/api/auth/getUser
resposta:
{"_id":"57df42a9daa1a3144b0f561d","updatedAt":"2016-09-19T01:43:05.054Z","createdAt":"2016-09-19T01:43:05.054Z","email":"lucas@gmail.com","senha":"$2a$05$L5alxOSsU.UH41alEFFNm.osaZ2YP2fLr7cpP/jqANFUQnQ.Ntn6C","data_criacao":"2016-09-19T01:43:05.041Z","data_ateracao":"2016-09-19T01:43:05.041Z","ultimo_login":null,"nome":"Lucas","__v":0,"telefones":[]}
[nodemon] clean exit - waiting for changes before restart
```
## Observações
Com relação aos requisitos:
- Optei por usar o JWT para gerenciar o tempo em que a sessão será mantida, ao invés de inserir a regra de verificação conforme o solicitado;
- Todas as rotas não esperadas são tratadas corretamente conforme o solicitado (retornando json com uma mensagem), porém, as mensagens de erro de autorização estou retornando o default do passport (unauthorized). Não tive tempo de sobrescrever o callback de erro padrão;
- Não estou trazando todas as informações do usuário. Fiz um SetUser para limpar informações desnecessárias e evitar trafegar muitos dados. Todos as informações são mantidas na base;

## Referências
- http://passportjs.org/docs/authenticate
- http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
- https://blog.jscrambler.com/implementing-jwt-using-passport/
- http://blog.slatepeak.com/refactoring-a-basic-authenticated-api-with-node-express-and-mongo/


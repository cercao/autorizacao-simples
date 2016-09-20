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
Fiz o deploy na instância 52.67.118.78 da aws ec2 usando TMUX.
Os métodos rest expostos são:
- Cadastro de usuários: http://52.67.118.78/api/auth/register
- Login: http://52.67.118.78/api/auth/login
- Busca usuário: http://52.67.118.78/api/auth/getUser

## Teste
Os testes unitários estão no arquivo unit-test.js na raiz da aplicação server:
Usei apenas um simples script em node para executar os teste da API. Para rodar, basta usar o próprio node ou o nodemon passando um argumento com o IP onde está a aplicação:
```sh
$ nodemon unit-test.js 52.67.118.78
```
ou para testes local (necessário alterar a porta no config/main.js)
```sh
$ nodemon unit-test.js localhost:3000
```
Este script executa métodos básicos expostos: register, login, getUser
Este aqui é o resultado dos testes apontando para aws:
```sh
[nodemon] clean exit - waiting for changes before restart
[nodemon] restarting due to changes...
[nodemon] starting `node unit-test.js 52.67.118.78`
Iniciando testes unitarios..

======= TESTE 1 ========
POST: http://52.67.118.78/api/auth/register
resposta:
{"token":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2UwOGMyM2U0MmU1YTFiNjQ0OTVlOTAiLCJub21lIjoiTmFtZSIsImVtYWlsIjoibHVjYXNfZXhlbXBsb0BnbWFpbC5jb20iLCJ0ZWxlZm9uZXMiOlt7Im51bWVybyI6IjExMTExMTEiLCJkZGQiOiIyMjIiLCJfaWQiOiI1N2UwOGMyM2U0MmU1YTFiNjQ0OTVlOTEifV0sImRhdGFfY3JpYWNhbyI6IjIwMTYtMDktMjBUMDE6MDg6NTEuNzM3WiIsImRhdGFfYWx0ZXJhY2FvIjoiMjAxNi0wOS0yMFQwMTowODo1MS43MzdaIiwidWx0aW1vX2xvZ2luIjoiMjAxNi0wOS0yMFQwMTowODo1MS43MzdaIiwiaWF0IjoxNDc0MzMzNzMyLCJleHAiOjE0NzQ0MzQ1MzJ9.5hYkzpwMCWaNTF7D2CK7mhiSt3banxk1R-xYvHn4Ffw","user":{"_id":"57e08c23e42e5a1b64495e90","nome":"Name","email":"lucas_exemplo@gmail.com","telefones":[{"numero":"1111111","ddd":"222","_id":"57e08c23e42e5a1b64495e91"}],"data_criacao":"2016-09-20T01:08:51.737Z","data_alteracao":"2016-09-20T01:08:51.737Z","ultimo_login":"2016-09-20T01:08:51.737Z"}}

======= TESTE 2 ========
POST: http://52.67.118.78/api/auth/login
resposta:
{"token":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2UwOGMyM2U0MmU1YTFiNjQ0OTVlOTAiLCJub21lIjoiTmFtZSIsImVtYWlsIjoibHVjYXNfZXhlbXBsb0BnbWFpbC5jb20iLCJ0ZWxlZm9uZXMiOlt7Im51bWVybyI6IjExMTExMTEiLCJkZGQiOiIyMjIiLCJfaWQiOiI1N2UwOGMyM2U0MmU1YTFiNjQ0OTVlOTEifV0sImRhdGFfY3JpYWNhbyI6IjIwMTYtMDktMjBUMDE6MDg6NTEuNzM3WiIsImRhdGFfYWx0ZXJhY2FvIjoiMjAxNi0wOS0yMFQwMTowODo1MS43MzdaIiwidWx0aW1vX2xvZ2luIjoiMjAxNi0wOS0yMFQwMTowODo1Mi4zNzlaIiwiaWF0IjoxNDc0MzMzNzMyLCJleHAiOjE0NzQ0MzQ1MzJ9.2xffFNK-S8xOKUEUUpF3pe2uCH7MJF75jj5SqpfXEz0","user":{"_id":"57e08c23e42e5a1b64495e90","nome":"Name","email":"lucas_exemplo@gmail.com","telefones":[{"numero":"1111111","ddd":"222","_id":"57e08c23e42e5a1b64495e91"}],"data_criacao":"2016-09-20T01:08:51.737Z","data_alteracao":"2016-09-20T01:08:51.737Z","ultimo_login":"2016-09-20T01:08:52.379Z"}}

======= TESTE 3 ========
GET: http://52.67.118.78/api/auth/getUser
resposta:
{"_id":"57e08c23e42e5a1b64495e90","updatedAt":"2016-09-20T01:08:51.739Z","createdAt":"2016-09-20T01:08:51.739Z","email":"lucas_exemplo@gmail.com","senha":"$2a$05$LG6wHsUelm3j7WgXPHmTI.n3flfqbkQ3zJ6IR8k6E0WgxPH7q1Dhe","data_criacao":"2016-09-20T01:08:51.737Z","data_alteracao":"2016-09-20T01:08:51.737Z","ultimo_login":"2016-09-20T01:08:51.737Z","nome":"Name","__v":0,"telefones":[{"numero":"1111111","ddd":"222","_id":"57e08c23e42e5a1b64495e91"}]}
[nodemon] clean exit - waiting for changes before restart
```
## Observações
Com relação aos requisitos:
- Estou colocando o token do JWT no body e não no user;
- Todas as rotas não esperadas são tratadas corretamente conforme o solicitado (retornando json com uma mensagem), porém, as mensagens de erro de autorização estou retornando o default do passport (unauthorized). Não tive tempo de sobrescrever o callback de erro padrão;

## Referências
- http://passportjs.org/docs/authenticate
- http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
- https://blog.jscrambler.com/implementing-jwt-using-passport/
- http://blog.slatepeak.com/refactoring-a-basic-authenticated-api-with-node-express-and-mongo/


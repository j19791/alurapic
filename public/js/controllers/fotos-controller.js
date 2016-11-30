//controller que disponibilize para a view o dado que ela precisa
//queremos acessar o módulo e não criar um novo.
//à função controller recebe 2 parâmetros. Nome do controller que estamos criando, o segundo uma função que define o controller.
//o Angular disponibiliza uma ponte de ligação entre o controller e a view - $scope e tudo que for "pendurado" neste objeto será enxergado pela view.
//acessar os dados do nosso servidor precisaremos realizar requisições Ajax (serviço $http) - assíncrono - q ñ bloqueia o uso da aplicação enquanto é executado.
//sistema de "pedir" ao Angular o que precisamos é chamado de injeção de dependências. "eu preciso de um $http!" e o framework se vira para nos entregar um. 
angular.module('alurapic').controller('FotosController', function($scope, $http) {

    /*$scope.foto = {
        titulo : 'Leão',
        url : 'http://www.fundosanimais.com/Minis/leoes.jpg'
    };*/

    $scope.fotos = [];

    //realizar uma requisição assíncrona para o endpoint v1/fotos - Toda requisição assíncrona é incerta, não sabemos quanto tempo ela demorará para ser executada e se realmente será bem sucedida.
    
    /*var promise = $http.get('/v1/fotos');//$http.get nos retorna é uma promessa de que ele buscará os dados
    promise.then(function(retorno) { //qdo essa promessa for cumprida, daí (then) podemos ter acesso aos dados retornados
        $scope.fotos = retorno.data;
    })
    .catch(function(erro) { //fornecerá um objeto com informações do erro que ocorreu:
        console.log(erro)
    });

    //Podemos ainda omitir a declaração da variável promise
    $http.get('/v1/fotos')
    .then(function(retorno) {
        $scope.fotos = retorno.data;
    })
    .catch(function(erro) {
        console.log(erro);
    });*/

    //usarmos success e error. A diferença é que com success não precisamos fazer retorno.data
    $http.get('/v1/fotos')
    .success(function(retorno) {
        console.log(retorno);
        $scope.fotos = retorno; // não precisa fazer retorno.data
    })
    .error(function(erro) {
        console.log(erro);
    });

});
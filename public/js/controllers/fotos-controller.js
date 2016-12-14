//controller que disponibilize para a view o dado que ela precisa
//queremos acessar o módulo e não criar um novo.
//à função controller recebe 2 parâmetros. Nome do controller que estamos criando, o segundo uma função que define o controller.
//o Angular disponibiliza uma ponte de ligação entre o controller e a view - $scope e tudo que for "pendurado" neste objeto será enxergado pela view.
//acessar os dados do nosso servidor precisaremos realizar requisições Ajax (serviço $http) - assíncrono - q ñ bloqueia o uso da aplicação enquanto é executado.
//sistema de "pedir" ao Angular o que precisamos é chamado de injeção de dependências. "eu preciso de um $http!" e o framework se vira para nos entregar um. 
angular.module('alurapic').controller('FotosController', function($scope, recursoFoto) {

    /*$scope.foto = {
        titulo : 'Leão',
        url : 'http://www.fundosanimais.com/Minis/leoes.jpg'
    };*/

    $scope.fotos = [];

    $scope.filtro = ''; //propriedade que guardará o texto digitado pelo usuário. Toda vez q o usuário digitar neste campo, a propriedade $scope.filtro será atualizada

    $scope.mensagem = ''; //mensagem de retorno para a tela principal no caso de sucesso da operação

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

    //nao é necessário mais criar recursoFoto pois  já que ele agora é recebido via injeção de dependência
    //var recursoFoto = $resource('/v1/fotos/:fotoId'); //passamos como parâmetro para $resource a URL de um endpoint REST, porém c/ um curinga. Esse curinga permitirá q o serviço monte por debaixo dos panos as URL's de acesso ao recurso. O retorno é um recurso devidamente configurado.

    recursoFoto.query(function(fotos) { //função que será chamada quando a requisição for bem sucedida
        $scope.fotos = fotos;
    }, function(erro) { //apenas chamado quando houver um erro
        console.log(erro);
    });

    
    //substituido por $recursoFoto
    //usarmos success e error. A diferença é que com success não precisamos fazer retorno.data
    /*$http.get('/v1/fotos')
    .success(function(retorno) {
        console.log(retorno);
        $scope.fotos = retorno; // não precisa fazer retorno.data
    })
    .error(function(erro) {
        console.log(erro);
    });*/


    $scope.remover = function(foto) {

        recursoFoto.delete({fotoId: foto._id}, //objeto cujas chaves devem corresponder ao curinga que usamos na definição da URL do recurso. O valor da chave é o ID da foto que desejamos apagar
        function() {//sucesso
	            var indiceDaFoto = $scope.fotos.indexOf(foto);
	            $scope.fotos.splice(indiceDaFoto, 1);
	            $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
        }, function(erro) {//erro
            console.log(erro);
            $scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
        });

        //substituido por recurso foto
        /*$http.delete('/v1/fotos/' + foto._id)
        .success(function() {
        	var indiceDaFoto = $scope.fotos.indexOf(foto);
            $scope.fotos.splice(indiceDaFoto, 1); //removermos a foto da lista quando a operação de remoção for bem sucedida. Para evitar que a foto continue sendo exibida (porque a lista de fotos no lado do cliente (navegador) não foi atualizada. )
            $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';

        })
        .error(function(erro) {
            console.log('Não foi possível apagar a foto ' + foto.titulo);
        });*/
    };


});
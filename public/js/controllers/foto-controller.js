// controller que nos dê suporte para a operação de cadastro.
angular.module('alurapic')
    .controller('FotoController', function($scope, $routeParams, recursoFoto) { //utilizar o serviço $http para gravar nosso produto. 
    																	//$routeParams: Precisamos do artefato $routeParams para termos acesso aos parâmetros passados nas URL das rotas. precisamos ter acesso ao ID da foto em FotoController para que possamos buscá-la em nosso servidor.
    																	//recursoFoto - injeção do serviço criado
        //como estamos usando a diretiva ng-model, a propriedade indicada será criada automaticamente no objeto, sendo assim, se usamos ng-model="foto.titulo", o Angular criará automaticamente em $scope.foto a propriedade titulo, inclusive atribuindo o valor digitado pelo usuário.
        $scope.foto = {};
        $scope.mensagem = ''; // mensagem de fracasso ou sucesso para indicar o status da operação com o servidor.
        
		//nao é necessário mais criar recursoFoto pois  já que ele agora é recebido via injeção de dependência
		/*var recursoFoto = $resource('/v1/fotos/:fotoId', null, {
            'update' : { //O serviço $resource não dá suporte ao verbo PUT, podemos criá-lo!
                method: 'PUT' //objeto com todas as novas ações que desejamos adicionar ao nosso recurso. Adicionamos a ação update, q possui como parâmetro um objeto que indica qual método será utilizado, em nosso caso PUT.
            }
        });*/

		//recupera os dados da foto para atualização
        if($routeParams.fotoId) {
		            recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto) {
		                $scope.foto = foto; 
		            }, function(erro) {
		                console.log(erro);
		                $scope.mensagem = 'Não foi possível obter a foto'
		            });

		            //substituido por recursoFoto
		            /*$http.get('/v1/fotos/' + $routeParams.fotoId)
		            .success(function(foto) {
		                $scope.foto = foto;
		            })
		            .error(function(erro) {
		                console.log(erro);
		                $scope.mensagem = 'Não foi possível obter a foto'
		            });*/
		        }
        

        $scope.submeter = function() {

            if ($scope.formulario.$valid) {//consultarmos em nosso $scope o status do formulário, perguntarmos se ele é válido 

		         if($routeParams.fotoId) {//se for edição, a rota vai passar fotoId

                    /*$http.put('/v1/fotos/' + $scope.foto._id, $scope.foto)//atualização
                    .success(function() {
                        $scope.mensagem = 'Foto alterada com sucesso';

                    })
                    .error(function(erro) {
                        console.log(erro);
                        $scope.mensagem = 'Não foi possível alterar';
                    });*/
                    recursoFoto.update({fotoId: $scope.foto._id}, 
                    $scope.foto, 
                    function() {
                        $scope.mensagem = 'Foto alterada com sucesso';
                    }, function(erro) {
                        console.log(erro);
                        $scope.mensagem = 'Não foi possível alterar';
                    });

                }
		        
		        else{
	                //substituido por recurso foto
	                /*$http.post('/v1/fotos', $scope.foto)
	                .success(function() {
	                	$scope.foto = {}; //limpar o formulário quando a mensagem for adicionada com sucesso. 
	                	$scope.formulario.$setPristine(); //evitar que ao ao limparmos o formulário, automaticamente nossa validação é disparada.
	                    $scope.mensagem = 'Foto cadastrada com sucesso';
	                })
	                .error(function(erro) {
	                    $scope.mensagem = 'Não foi possível cadastrar a foto';
	                })*/
	                recursoFoto.save($scope.foto, //os dados que queremos salvar
	                function() {//sucesso
                        $scope.foto = {};
                        $scope.mensagem = 'Foto cadastrada com sucesso';
                    }, function(erro) {//erro
                        console.log(erro);
                        $scope.mensagem = 'Não foi possível cadastrar a foto';
                    });
            	}


            }
        };
    });
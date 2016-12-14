//Angular disponibiliza para nós no escopo global : objeto angular
//module - responsável pela criação de módulos
//argumentos: nome do módulo, array com todos os módulos de que nosso módulo depende
//'minhasDiretivas' - dependencia do modulo 
//configurar rotas no lado do cliente, o módulo ngRoute precisa estar carregado
//meusServicos é um serviço criado, para injeção do recursoFoto
angular.module('alurapic',['minhasDiretivas', 'ngAnimate', 'ngRoute', 'meusServicos'])
	.config(function($routeProvider, //config configuramos rotas, solicitando através de injeção $routeProvider
					$locationProvider){  //O Angular suporta a History API e podemos ativá-la através do serviço $locationProvider
		
		$locationProvider.html5Mode(true);

		//registro de rotas

		$routeProvider.when('/fotos', {//nome da rota (endereço) que desejamos configurar
			controller: 'FotosController', //associa um controller à parcial - podemos configurar uma rota sem associá-la a um controller
			templateUrl : 'partials/principal.html' // indica seu template
		});

		$routeProvider.when('/fotos/new', {//parcial do cadastro de fotos
            templateUrl: 'partials/foto.html',
            controller: 'FotoController'
        });
		
		//quando o usuário clicar no botão editar, iremos aproveitar a parcial foto.html, porém enviaremos o ID da foto como parâmetro
        $routeProvider.when('/fotos/edit/:fotoId', {//usamos o curinga :fotoId que serve para duas coisas: indicar que a rota pode aceitar qualquer valor na posição do curinga e para indicar como teremos acesso ao parâmetro passado em nossos controllers.
            templateUrl: 'partials/foto.html',
            controller: 'FotoController'
        });

		$routeProvider.otherwise({redirectTo: '/fotos'});//rota alternativa caso o endereço acessado pelo usuário não exista
});


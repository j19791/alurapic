//Angular disponibiliza para nós no escopo global : objeto angular
//module - responsável pela criação de módulos
//argumentos: nome do módulo, array com todos os módulos de que nosso módulo depende
//'minhasDiretivas' - dependencia do modulo 
//configurar rotas no lado do cliente, o módulo ngRoute precisa estar carregado
angular.module('alurapic',['minhasDiretivas', 'ngAnimate', 'ngRoute'])
	.config(function($routeProvider, //config configuramos rotas, solicitando através de injeção $routeProvider
					$locationProvider){  //O Angular suporta a History API e podemos ativá-la através do serviço $locationProvider
		
		$locationProvider.html5Mode(true);

		$routeProvider.when('/fotos', {//nome da rota (endereço) que desejamos configurar
			controller: 'FotosController', //associa um controller à parcial - podemos configurar uma rota sem associá-la a um controller
			templateUrl : 'partials/principal.html' // indica seu template
		});

		$routeProvider.when('/fotos/new', {//parcial do cadastro de fotos
            templateUrl: 'partials/foto.html'
        });

		$routeProvider.otherwise({redirectTo: '/fotos'});//rota alternativa caso o endereço acessado pelo usuário não exista
});


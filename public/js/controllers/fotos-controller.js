//controller que disponibilize para a view o dado que ela precisa
//queremos acessar o módulo e não criar um novo.
//à função controller recebe 2 parâmetros. Nome do controller que estamos criando, o segundo uma função que define o controller.
//o Angular disponibiliza uma ponte de ligação entre o controller e a view - $scope e tudo que for "pendurado" neste objeto será enxergado pela view.

angular.module('alurapic').controller('FotosController', function($scope) {

    $scope.foto = {
        titulo : 'Leão',
        url : 'http://www.fundosanimais.com/Minis/leoes.jpg'
    };

});
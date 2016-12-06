//criação do módulo minhasDiretivas
//componentes reutilizáveis chamados de diretivas, que podem encapsular, esconder a complexidade da marcação

angular.module('minhasDiretivas', [])
.directive('meuPainel', function() { //criação da diretiva meu-painel - função q define a diretiva
        var ddo = {}; 

        ddo.restrict = "AE";//restringindo a forma de uso da nossa diretiva. Uma diretiva pode ser usada como (E)lemento, (A)tributo ou (C)omentário			
        /*	pode ser usada como elemento
        	<meu-painel></meu-painel>
			
			Ou como atributo, neste caso, usamos uma div adicionando a diretiva:
			<div meu-painel></div>

			O nome da diretiva está em camelCase, porém na marcação HTML estamos usando hífen. Este é um padrão do Angular e deverá ser assim p/ diretiva funcionar.
        */

        ddo.transclude = true; //Para que o Angular preserve o conteúdo original da diretiva, com seus elementos filhos, precisamos usar o mecanismo de transclusão.
 

        ddo.scope = { //capturar o título passado pela diretiva para dentro de seu escopo isolado 
            titulo: '@titulo' //a sintaxe @ indica que estamos copiando o valor como string do atributo titulo - quando o nome do atributo na diretiva na marcação é igual ao nome da propriedade que guardará o seu valor, podemos deixar apenas @
        };



        //definir a marcação HTML que será utilizada pela diretiva
        /*ddo.template = 
                '<div class="panel panel-default">'
            +   '   <div class="panel-heading">'
            +   '        <h3 class="panel-title text-center">{{titulo}}</h3> '
            +   '   </div>'
            +   '   <div class="panel-body" ng-transclude>' //elemento que deve preservar seus elementos filhos
            +   '   </div>'
            +   '</div>'*/

         ddo.templateUrl = 'js/directives/meu-painel.html'; //apontando para o arquivo HTML com a marcação da diretiva

        return ddo;//a função deverá retornar sempre directive definition object (DDO)
    })
.directive('minhaFoto', function() {

        var ddo = {};

        ddo.restrict = "AE";

        ddo.scope = {
            titulo: '@',
            url: '@'
        };

        ddo.template = '<img class="img-responsive center-block" src="{{url}}" alt="{{titulo}}">';           

        return ddo;

    });
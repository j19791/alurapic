//o Angular permite a criação de serviços que podem ser injetados, como qualquer recurso do Angular. Podemos esconder a complexidade do nosso $resource criando um serviço que o retorne já configurado.

angular.module('meusServicos', ['ngResource'])
    .factory('recursoFoto', function($resource) {

        return $resource('/v1/fotos/:fotoId', null, {
            'update' : { 
                method: 'PUT'
            }
        });
    });
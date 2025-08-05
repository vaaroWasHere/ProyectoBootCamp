const app = angular.module('appProyecto', ['ngRoute']); 

app.config(function($routeProvider) {
  $routeProvider
    .when('/conocenos', {
      templateUrl: 'vistas/Conocenos.html',
      controller: 'ControladorConocenos'
    })
    .when('/historias', {
      templateUrl: 'vistas/Historias.html',
      controller: 'ControladorHistorias'
    })
    .when('/ConsumoEnergetico', {
      templateUrl: 'vistas/ConsumoEnergetico.html',
      controller: 'ControladorConsumoEnergetico'
    })
 
    .otherwise({
      redirectTo: '/conocenos' // Página por defecto
    });
});

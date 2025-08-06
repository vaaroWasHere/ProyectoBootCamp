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

    .when('/AcercadelaEnergiaSolar', {
      templateUrl: 'vistas/AcercadelaEnergia',
      controller: 'ControladorAcercaDe'
    })
    .when('/GraficasInformativas', {
      templateUrl: 'vistas/GraficasInformativas',
      controller: 'ControladorGraficas'
    })
     .when('/InnovacionenColombia', {
      templateUrl: 'vistas/InnovaciónenColombia',
      controller: 'ControladorenColombia'
    })
     .when('/DesarrolloSostenible', {
      templateUrl: 'vistas/DesarrolloSostenible.html',
      controller: 'DesarrolloSostenible'
    })
});

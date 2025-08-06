const app = angular.module('appProyecto', ['ngRoute']); 

app.config(function($routeProvider) {
  $routeProvider
   
    .when('/historias', {
      templateUrl: 'vistas/Historias.html',
      controller: 'ControladorHistorias'
    })
    .when('/ConsumoEnergetico', {
      templateUrl: 'vistas/ConsumoEnergetico.html',
      controller: 'ControladorConsumoEnergetico'
    })

    .when('/Acerca', {
      templateUrl: 'vistas/AcercaEnergia.html',
      controller: 'ControladorAcerca'
    })

    .when('/GraficasInformativas', {
      templateUrl: 'vistas/GraficasInformativas.html',
      controller: 'ControladorGraficas'
    })
     .when('/InnovacionenColombia', {
      templateUrl: 'vistas/InnovaciónenColombia.html',
      controller: 'ControladorenColombia'
    })
     .when('/DesarrolloSostenible', {
      templateUrl: 'vistas/DesarrolloSostenible.html',
      controller: 'DesarrolloSostenible'
    })
});

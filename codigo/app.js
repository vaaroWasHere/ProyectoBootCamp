var app = angular.module("appProyecto", ["ngRoute"]);


app.config(function ($routeProvider) {
  $routeProvider

    .when('/ConsumoEnergetico', {
      templateUrl: 'vistas/ConsumoEnergetico.html',
      controller: 'ControladorConsumoEnergetico'
    })

    .when("/radiacion", {
      templateUrl: "vistas/RadiacionSolar.html",
      controller: "ControladorRadiacionSolar"
    })

    // otras rutas
    .otherwise({
      redirectTo: "/inicio"
    });

});


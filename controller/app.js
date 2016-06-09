var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);

myApp.config(function($routeProvider){

  $routeProvider
  .when('/', {
    templateUrl: 'pages/main.html',
    controller: 'mainCtrl',
    controllerAs: 'main'
  })
  .otherwise({
    redirectTo: '/'
  });
});
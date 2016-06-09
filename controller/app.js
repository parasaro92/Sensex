var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);

myApp.config(function($routeProvider){

  $routeProvider
  .when('/', {
    templateUrl: 'pages/main.html',
    controller: 'mainCtrl',
    controllerAs: 'main'
  })
  .when('/pop', {
    templateUrl: 'pages/pop.html',
    controller: 'popCtrl',
    controllerAs: 'pop'
  })
  .otherwise({
    redirectTo: '/'
  });
});
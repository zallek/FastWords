'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'colorpicker.module'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/home', {
          templateUrl: 'partials/home.html',
          controller: 'HomeCtrl'
      })
      .when('/mods', {
          templateUrl: 'partials/mods.html',
          controller: 'ModsListCtrl'
      })
      .when('/mods/falling', {
          templateUrl: 'partials/mods/falling.html',
          controller: 'FallingCtrl'
      })
      .otherwise({redirectTo: '/mods'});
}]);

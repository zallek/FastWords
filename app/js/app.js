'use strict';


// Declare app level module which depends on filters, and services
angular.module('Fastwords', [
  'ngRoute',
  'Fastwords.filters',
  'Fastwords.services',
  'Fastwords.libs',
  'Fastwords.constants',
  'Fastwords.directives',
  'Fastwords.controllers',
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
          controller: 'EngineCtrl'
      })
      .when('/mods/catch-them-all', {
          templateUrl: 'partials/mods/catch-them-all.html',
          controller: 'EngineCtrl'
      })
      .otherwise({redirectTo: '/mods'});
}]);

'use strict';

/**
 * @ngdoc overview
 * @name ngtodoApp
 * @description
 * # ngtodoApp
 *
 * Main module of the application.
 */
angular
  .module('ngtodoApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as vmm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

/// <reference path="../../tsdefs/angularjs/angular.d.ts"/>
'use strict';
/**
 * @ngdoc overview
 * @name ngtodoApp
 * @description
 * # ngtodoApp
 *
 * Main module of the application.
 */
angular.module('ngtodoApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'LocalStorageModule'
]).config(function ($routeProvider) {
    $routeProvider.when('/hack', {
        templateUrl: 'views/hack.html',
        controller: 'HackCtrl as vmh'
    }).when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as vmm'
    }).otherwise({
        redirectTo: '/'
    });
});

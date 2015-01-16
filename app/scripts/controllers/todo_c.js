'use strict';

/**
 * @ngdoc function
 * @name ngtodoApp.controller:TodoCCtrl
 * @description
 * # TodoCCtrl
 * Controller of the ngtodoApp
 */
angular.module('ngtodoApp')
  .controller('TodoCCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name ngtodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngtodoApp
 */
angular.module('ngtodoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
'use strict';
var MainCtrl = (function () {
    function MainCtrl($scope) {
        this.sig = 'MainCtrl'; // I always do this to help debugging DI, and as my first test
        $scope.vmm = this; // thus {{vmm.sig}} within the HTML
    }
    MainCtrl.prototype.aSimpleFunction = function () {
        return 'foo';
    };
    MainCtrl.$inject = ['$scope']; // allows safe minification
    return MainCtrl;
})();
angular.module('ngtodoApp').controller('MainCtrl', MainCtrl);

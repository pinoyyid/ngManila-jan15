/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../services/datamodel_methods_s.ts"/>
'use strict';
var Todo;
(function (Todo) {
    var HackCtrl = (function () {
        function HackCtrl(DMMethods, $q) {
            this.sig = 'HackCtrl'; // I always do this to help debugging DI, and as my first test
            this.newTitle = '';
            this.dm = DMMethods;
            this.q = $q;
        }
        /**
        * called when the complete checkbox is ticked
        */
        HackCtrl.prototype.todoClicked = function (todo) {
            this.dm.markTodoAsComplete(todo);
        };
        /**
        * called when the doit button is pressed
        */
        HackCtrl.prototype.doit = function () {
            console.log(1111);
        };
        /*
        this commented out code is the 'old' method, ie. not using 'controller as'
    
    
        static $inject = ['$scope', 'DMMethods'];	// allows safe minification
        constructor($scope,DMMethods) {
        $scope.vmm = this;				// thus {{vmm.sig}} within the HTML
        */
        HackCtrl.$inject = ['DMMethods', '$q'];
        return HackCtrl;
    })();
    Todo.HackCtrl = HackCtrl;
})(Todo || (Todo = {}));
angular.module('ngtodoApp').controller('HackCtrl', Todo.HackCtrl);

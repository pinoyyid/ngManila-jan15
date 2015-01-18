/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../services/datamodel_methods_s.ts"/>
'use strict';
var Todo;
(function (Todo) {
    var MainCtrl = (function () {
        function MainCtrl(DMMethods) {
            this.sig = 'MainCtrl'; // I always do this to help debugging DI, and as my first test
            this.newTitle = '';
            this.dm = DMMethods; // store a reference to the DataModel Methods service
        }
        /**
        * called when the complete checkbox is ticked
        */
        MainCtrl.prototype.todoClicked = function (todo) {
            this.dm.markTodoAsComplete(todo);
        };
        /**
        * called when the save button is pressed
        */
        MainCtrl.prototype.newTodo = function () {
            this.dm.newTodo(this.newTitle);
            this.newTitle = '';
        };
        /*
        this commented out code is the 'old' method, ie. not using controller as
    
    
        static $inject = ['$scope', 'DMMethods'];	// allows safe minification
        constructor($scope,DMMethods) {
        $scope.vmm = this;				// thus {{vmm.sig}} within the HTML
        */
        MainCtrl.$inject = ['DMMethods']; // allows safe minification
        return MainCtrl;
    })();
    Todo.MainCtrl = MainCtrl;
})(Todo || (Todo = {}));
angular.module('ngtodoApp').controller('MainCtrl', Todo.MainCtrl);

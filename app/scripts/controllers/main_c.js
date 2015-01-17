/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../services/datamodel_methods.ts"/>
'use strict';
var MainCtrl = (function () {
    function MainCtrl($scope, DMMethods) {
        this.sig = 'MainCtrl'; // I always do this to help debugging DI, and as my first test
        this.newTitle = '';
        $scope.vmm = this; // thus {{vmm.sig}} within the HTML
        this.dm = DMMethods;
    }
    MainCtrl.prototype.todoClicked = function (todo) {
        console.log(todo.title + " is now complete");
        this.dm.markTodoAsComplete(todo);
    };
    MainCtrl.prototype.newTodo = function () {
        this.dm.newTodo(this.newTitle);
        this.newTitle = '';
    };
    MainCtrl.$inject = ['$scope', 'DMMethods']; // allows safe minification
    return MainCtrl;
})();
angular.module('ngtodoApp').controller('MainCtrl', MainCtrl);

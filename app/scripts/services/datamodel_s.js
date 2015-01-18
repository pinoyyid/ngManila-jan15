/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../common/todoItem.ts"/>
'use strict';
var Todo;
(function (Todo) {
    var Data = (function () {
        function Data() {
            this.sig = 'Data';
            this.allTodoItemsArray = [];
            this.allTodoItemsMap = {};
            var t;
            t = new Todo.Todo();
            t.title = 'title 1';
            this.allTodoItemsArray.push(t);
            t = new Todo.Todo();
            t.title = 'title 2';
            this.allTodoItemsArray.push(t);
            t = new Todo.Todo();
            t.title = 'title 3';
            this.allTodoItemsArray.push(t);
            t = new Todo.Todo();
            t.title = 'title 4';
            this.allTodoItemsArray.push(t);
        }
        return Data;
    })();
    Todo.Data = Data;
})(Todo || (Todo = {}));
angular.module('ngtodoApp').service('Data', Todo.Data);

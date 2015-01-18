/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../common/todoItem.ts"/>
/// <reference path="./datamodel_s.ts"/>
'use strict';
var Todo;
(function (Todo) {
    /**
    * A class containing all of the method which operate on the Todo data model
    */
    var DMMethods = (function () {
        function DMMethods(Data) {
            this.sig = 'DMMethods';
            this.datamodel = Data; // store the reference to the data model
        }
        /**
        * Create a new todo item
        * @param title  the title of the new item
        * @return the newly created todo item
        */
        DMMethods.prototype.newTodo = function (title) {
            var newTodo = new Todo.Todo();
            newTodo.id = new Date().valueOf();
            newTodo.title = title;
            this.datamodel.allTodoItemsArray.push(newTodo);
            this.datamodel.allTodoItemsMap[newTodo.id] = newTodo;
            return newTodo;
        };
        /**
        * Mark a todo item as being complete
        * @param Todo item
        */
        DMMethods.prototype.markTodoAsComplete = function (todoItem) {
            todoItem.dateCompleted = new Date().toISOString();
        };
        /**
        * Return an array of incomplete Todo items
        * @return Array<Todo>
        */
        DMMethods.prototype.getAllIncompleteTodos = function () {
            var itArray = [];
            for (var i = 0; i < this.datamodel.allTodoItemsArray.length; i++) {
                var todo = this.datamodel.allTodoItemsArray[i];
                if (!todo.isComplete()) {
                    itArray.push(todo);
                }
            }
            return itArray;
        };
        DMMethods.$inject = ['Data']; // Angular will inject the Data model service
        return DMMethods;
    })();
    Todo.DMMethods = DMMethods;
})(Todo || (Todo = {}));
angular.module('ngtodoApp').service('DMMethods', Todo.DMMethods);
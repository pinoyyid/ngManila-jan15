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
        function DMMethods(Data, LocalStorage) {
            this.sig = 'DMMethods'; // I always do this to help debugging DI, and as my first test
            this.datamodel = Data; // store the reference to the data model
            this.ls = LocalStorage; // store the reference to the data model
            // initialise from local storage
            this.datamodel.allTodoItemsArray = this.ls.load();
            if (!this.datamodel.allTodoItemsArray) {
                this.datamodel.allTodoItemsArray = [];
            }
            this.buildMapFromArray();
        }
        /**
         * Iterate the todo items array and build the map
         */
        DMMethods.prototype.buildMapFromArray = function () {
            for (var i = 0; i < this.datamodel.allTodoItemsArray.length; i++) {
                var todo = this.datamodel.allTodoItemsArray[i];
                this.datamodel.allTodoItemsMap[todo.id] = todo;
            }
        };
        /**
        * Create a new todo item
        * @param title  the title of the new item
        * @return the newly created todo item
        */
        DMMethods.prototype.newTodo = function (title) {
            var newTodo = new Todo.Todo();
            newTodo.id = "id" + new Date().valueOf();
            newTodo.title = title;
            this.datamodel.allTodoItemsArray.push(newTodo);
            this.datamodel.allTodoItemsMap[newTodo.id] = newTodo;
            this.ls.save(this.datamodel.allTodoItemsArray);
            return newTodo;
        };
        /**
        * Mark a todo item as being complete
        * @param Todo item
        */
        DMMethods.prototype.markTodoAsComplete = function (todoItem) {
            todoItem.dateCompleted = new Date().toISOString();
            this.ls.save(this.datamodel.allTodoItemsArray);
        };
        /**
        * Return an array of incomplete Todo items
        * @return Array<Todo>
        */
        DMMethods.prototype.getAllIncompleteTodos = function () {
            var itArray = [];
            for (var i = 0; i < this.datamodel.allTodoItemsArray.length; i++) {
                var todo = this.datamodel.allTodoItemsArray[i];
                if (!this.isComplete(todo)) {
                    itArray.push(todo);
                }
            }
            return itArray;
        };
        /**
        * return truthy if the Todo item is complete
        */
        DMMethods.prototype.isComplete = function (todo) {
            return !!todo.dateCompleted;
        };
        DMMethods.$inject = ['Data', 'LocalStorage']; // Angular will inject the Data model service
        return DMMethods;
    })();
    Todo.DMMethods = DMMethods;
})(Todo || (Todo = {}));
angular.module('ngtodoApp').service('DMMethods', Todo.DMMethods);

/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../common/todoItem.ts"/>
/// <reference path="./datamodel_s.ts"/>
/// <reference path="./localstorage_s.ts"/>
/// <reference path="./restserver_http_s.ts"/>
'use strict';
var Todo;
(function (Todo) {
    /**
     * A class containing all of the method which operate on the Todo data model
     */
    var DMMethods = (function () {
        function DMMethods(Data, LocalStorage, RestServer) {
            var _this = this;
            this.sig = 'DMMethods'; // I always do this to help debugging DI, and as my first test
            this.datamodel = Data; // store the reference to the data model
            this.ls = LocalStorage; // store the reference to the LocalStorage service
            this.rest = RestServer; // store the reference to the REST service        // REST
            // try to initialise from local storage
            this.datamodel.allTodoItemsArray = this.ls.load();
            if (this.datamodel.allTodoItemsArray) {
                this.buildMapFromArray(); // if found in localstorage, build map
            }
            else {
                this.datamodel.allTodoItemsArray = [];
                // if localstorage is empty, initialise from REST server
                this.rest.list().success(function (data) {
                    console.log(data);
                    _this.datamodel.allTodoItemsArray = data["items"];
                    _this.buildMapFromArray(); // still need to build map
                });
            }
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
         *
         * stores in memory model, which is persisted to disk
         * also uploads to REST service

         * @param title  the title of the new item
         * @return the newly created todo item
         */
        DMMethods.prototype.newTodo = function (title) {
            var _this = this;
            var newTodo = new Todo.Todo();
            newTodo.id = "id" + new Date().valueOf();
            newTodo.title = title;
            this.datamodel.allTodoItemsArray.push(newTodo);
            this.datamodel.allTodoItemsMap[newTodo.id] = newTodo;
            // save to rest server
            // we'll capture the returned promise in a var, but ...
            // often written as this.rest.insert(newTodo).success().error() in examples, but not in real life;
            var promise = this.rest.insert(newTodo); // REST
            // on success, we need to re-store the item with its new server-generated id
            promise.success(function (restTodo) {
                console.log('got server generated id ' + restTodo.id);
                newTodo.id = restTodo.id; // update with the server generated ID
                // save to local storage
                _this.ls.save(_this.datamodel.allTodoItemsArray); // and re-save to local storage
                _this.datamodel.allTodoItemsMap[newTodo.id] = newTodo; // and add to map
            });
            // save to local storage
            this.ls.save(this.datamodel.allTodoItemsArray);
            return newTodo;
        };
        /**
         * Mark a todo item as being complete
         * @param Todo item
         */
        DMMethods.prototype.markTodoAsComplete = function (todoItem) {
            todoItem.completed = new Date().toISOString();
            this.ls.save(this.datamodel.allTodoItemsArray);
            this.rest.update(todoItem); // REST
        };
        /**
         * Return an array of incomplete Todo items
         * @return Array<Todo>
         */
        DMMethods.prototype.getAllIncompleteTodos = function () {
            var itArray = [];
            for (var i = 0; i < (this.datamodel.allTodoItemsArray ? this.datamodel.allTodoItemsArray.length : 0); i++) {
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
            return !!todo.completed;
        };
        DMMethods.$inject = ['Data', 'LocalStorage', 'RestServer'];
        return DMMethods;
    })();
    Todo.DMMethods = DMMethods;
})(Todo || (Todo = {}));
angular.module('ngtodoApp').service('DMMethods', Todo.DMMethods);

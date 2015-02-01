/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../common/todoItem.ts"/>
/// <reference path="./datamodel_s.ts"/>
/// <reference path="./localstorage_s.ts"/>
/// <reference path="./restserver_http_s.ts"/>
'use strict';


module Todo {
    /**
     * A class containing all of the method which operate on the Todo data model
     */
    export class DMMethods {
        sig = 'DMMethods'; // I always do this to help debugging DI, and as my first test
        datamodel: Data; // the in-memory data model
        ls: Todo.LocalStorage;
        rest: RestServer; // REST

        static $inject = ['Data', 'LocalStorage', 'RestServer'];
        constructor(Data, LocalStorage, RestServer) {
            this.datamodel = Data; // store the reference to the data model
            this.ls = LocalStorage; // store the reference to the LocalStorage service
            this.rest = RestServer; // store the reference to the REST service        // REST

            // try to initialise from local storage
            this.datamodel.allTodoItemsArray = this.ls.load();
            if (this.datamodel.allTodoItemsArray) {
                this.buildMapFromArray(); // if found in localstorage, build map
            } else {
                this.datamodel.allTodoItemsArray = [];
                // if localstorage is empty, initialise from REST server
                this.rest.list().success((data) => {
                    console.log(data);
                    this.datamodel.allTodoItemsArray = data["items"];
                    this.buildMapFromArray(); // still need to build map
                });
            }
        }

        /**
         * Iterate the todo items array and build the map
         */
        buildMapFromArray() {
            for (var i = 0; i < this.datamodel.allTodoItemsArray.length; i++) {
                var todo: Todo = this.datamodel.allTodoItemsArray[i];
                this.datamodel.allTodoItemsMap[todo.id] = todo;
            }
        }

        /**
         * Create a new todo item
         *
         * stores in memory model, which is persisted to disk
         * also uploads to REST service

         * @param title  the title of the new item
         * @return the newly created todo item
         */
        newTodo(title: string): Todo {
            var newTodo: Todo = new Todo();
            newTodo.id = "id" + new Date().valueOf();
            newTodo.title = title;
            this.datamodel.allTodoItemsArray.push(newTodo);
            this.datamodel.allTodoItemsMap[newTodo.id] = newTodo;
            // save to rest server
            // we'll capture the returned promise in a var, but ...
            // often written as this.rest.insert(newTodo).success().error() in examples, but not in real life;
            var promise = this.rest.insert(newTodo); // REST
            // on success, we need to re-store the item with its new server-generated id
            promise.success((restTodo: Todo) => {
                console.log('got server generated id ' + restTodo.id);
                newTodo.id = restTodo.id; // update with the server generated ID
                // save to local storage
                this.ls.save(this.datamodel.allTodoItemsArray); // and re-save to local storage
                this.datamodel.allTodoItemsMap[newTodo.id] = newTodo; // and add to map
            });

            // save to local storage
            this.ls.save(this.datamodel.allTodoItemsArray);
            return newTodo;
        }



        /**
         * Mark a todo item as being complete
         * @param Todo item
         */
        markTodoAsComplete(todoItem: Todo) {
            todoItem.completed = new Date().toISOString();
            this.ls.save(this.datamodel.allTodoItemsArray);
            this.rest.update(todoItem); // REST
        }



        /**
         * Return an array of incomplete Todo items
         * @return Array<Todo>
         */
        getAllIncompleteTodos(): Array < Todo > {
            var itArray = [];
            for (var i = 0; i < (this.datamodel.allTodoItemsArray ? this.datamodel.allTodoItemsArray.length : 0); i++) {
                var todo = this.datamodel.allTodoItemsArray[i];
                if (!this.isComplete(todo)) {
                    itArray.push(todo);
                }
            }
            return itArray;
        }


        /**
         * return truthy if the Todo item is complete
         */
        isComplete(todo: Todo): boolean {
            return !!todo.completed;
        }

        // delete Todo,  etc
    }
}

angular.module('ngtodoApp')
    .service('DMMethods', Todo.DMMethods);

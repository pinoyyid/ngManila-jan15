/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../common/todoItem.ts"/>
/// <reference path="./datamodel_s.ts"/>
'use strict';
var Todo;
(function (Todo) {
    /**
    * A class containing all of the method which operate on the Todo data model
    */
    var LocalStorage = (function () {
        function LocalStorage(als) {
            this.sig = 'LocalStorage'; // I always do this to help debugging DI, and as my first test
            this.key = 'Todolist';
            this.als = als;
        }
        /**
        * Save to local storage
        */
        LocalStorage.prototype.save = function (todolist) {
            this.als.set(this.key, todolist);
        };
        /**
        * load from local storage
        */
        LocalStorage.prototype.load = function () {
            var resp = this.als.get(this.key);
            return resp;
        };
        LocalStorage.$inject = ['localStorageService']; // Angular will inject the Data model service
        return LocalStorage;
    })();
    Todo.LocalStorage = LocalStorage;
})(Todo || (Todo = {}));
angular.module('ngtodoApp').service('LocalStorage', Todo.LocalStorage);

/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../common/todoItem.ts"/>
'use strict';


class Data {
	sig = 'Data';
	allTodoItemsArray:Array<Todo> = [];
	allTodoItemsMap:{id:number; todoItem:Todo};
}

angular.module('ngtodoApp')
  .service('Data', Data);

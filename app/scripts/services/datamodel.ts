/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../common/todoItem.ts"/>
'use strict';


class Data {
	allTodoItemsArray:Array<Todo> = [];
	allTodoItemsMap:{id:number; todoItem:Todo};

	constructor() {
	// populate the data model, eg from a REST service or from local storage (or both)
	}
}

angular.module('ngtodoApp')
  .service('Data', Data);

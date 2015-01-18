/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../common/todoItem.ts"/>
'use strict';


module  Todo {
  export class Data {
	sig = 'Data';				// I always do this to help debugging DI, and as my first test
	allTodoItemsArray:Array<Todo> = [];	// all Todo items, as an array
	allTodoItemsMap = {};			// all Todo items as a map, keyed by ID

	constructor() {
		// load some test data
		var t;
		t = new Todo(); t.title = 'title 1'; this.allTodoItemsArray.push(t);
		t = new Todo(); t.title = 'title 2'; this.allTodoItemsArray.push(t);
		t = new Todo(); t.title = 'title 3'; this.allTodoItemsArray.push(t);
		t = new Todo(); t.title = 'title 4'; this.allTodoItemsArray.push(t);
	}
  }
}

angular.module('ngtodoApp')
  .service('Data', Todo.Data);

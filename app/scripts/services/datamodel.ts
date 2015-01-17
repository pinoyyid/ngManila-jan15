/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../common/todoItem.ts"/>
'use strict';


class Data {
	sig = 'Data';
	allTodoItemsArray:Array<Todo> = [];
	allTodoItemsMap = {};

	constructor() {
	var t;
	t = new Todo(); t.title = 'title 1'; this.allTodoItemsArray.push(t);
	t = new Todo(); t.title = 'title 2'; this.allTodoItemsArray.push(t);
	t = new Todo(); t.title = 'title 3'; this.allTodoItemsArray.push(t);
	t = new Todo(); t.title = 'title 4'; this.allTodoItemsArray.push(t);


	}

}

angular.module('ngtodoApp')
  .service('Data', Data);

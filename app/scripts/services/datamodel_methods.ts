/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../common/todoItem.ts"/>
/// <reference path="./datamodel.ts"/>
'use strict';

/**
* A class containing all of the method which operate on the Todo data model
*/
class TodoMethods {
	
	datamodel:Data;					// the in-memory data model

	static $inject = ['Data'];			// Angular will inject the Data model service
	constructor(Data) {
		this.datamodel = Data;			// store the reference to the data model
	}
	
	/**
	* Create a new todo item
	* @param title  the title of the new item
	* @return the newly created todo item
	*/
	newTodo(title:string):Todo {
		var newTodo = new Todo();
		newTodo.id = new Date().valueOf();
		newTodo.title = title;
		this.datamodel.allTodoItemsArray.push(newTodo);
		this.datamodel.allTodoItemsMap[newTodo.id] = newTodo;
		return newTodo;
	}

	/**
	* Mark a todo item as being complete
	* @param Todo item
	*/
	markTodoAsComplete(todoItem:Todo) {
		todoItem.dateCompleted = new Date().toISOString();
		todoItem.complete = true;
	}


	// delete Todo,  etc
}

angular.module('ngtodoApp')
  .service('TodoMethods', TodoMethods);

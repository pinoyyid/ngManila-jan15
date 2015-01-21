/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../common/todoItem.ts"/>
/// <reference path="./datamodel_s.ts"/>
'use strict';

module  Todo {
/**
* A class containing all of the method which operate on the Todo data model
*/
  export class DMMethods {
	sig = 'DMMethods';				// I always do this to help debugging DI, and as my first test
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
	}



	/**
	* Return an array of incomplete Todo items
	* @return Array<Todo>
	*/
	getAllIncompleteTodos():Array<Todo> {
		var itArray = [];
		for (var i=0; i < this.datamodel.allTodoItemsArray.length; i++) {
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
	isComplete(todo:Todo):boolean {		
		return !!todo.dateCompleted;
	}

	// delete Todo,  etc
 }
}

angular.module('ngtodoApp')
  .service('DMMethods', Todo.DMMethods);

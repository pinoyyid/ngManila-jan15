/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../services/datamodel_methods.ts"/>

'use strict';

// Optional. Defines the contract between JS and HTML
interface IMainCtrl {
	sig:string;					// [provide info for HTML designer here] eg...
	todoClicked:(todo:Todo)=>void;			// click event for the complete checkbox
	newTitle:string;				// input text for new todo item title
}


class MainCtrl implements IMainCtrl {
	sig = 'MainCtrl';				// I always do this to help debugging DI, and as my first test
	dm:DMMethods;

	newTitle = '';

	static $inject = ['$scope', 'DMMethods'];		// allows safe minification
	constructor($scope,DMMethods) {
		$scope.vmm = this;			// thus {{vmm.sig}} within the HTML
		this.dm = DMMethods;
	}

	todoClicked(todo:Todo):void {
		console.log(todo.title +" is now complete");
		this.dm.markTodoAsComplete(todo);
	}

	newTodo() {
		this.dm.newTodo(this.newTitle);
		this.newTitle = '';
	}

}
angular.module('ngtodoApp').controller('MainCtrl',MainCtrl)

'use strict';

/**
*   The definition of the Todo object that will be used throughout the app
*/

module  Todo {	    					// each class is defined within the Todo module
  export class Todo {
	id:             string;
	title: 		string;
	dateCreated: 	string;		
	completed:	string;				// undefined for an incomplete Todo item. Good idea??
  }
}

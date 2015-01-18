'use strict';

/**
*   The definition of the Todo object that will be used throughout the app
*/

module  Todo {						// each class is defined within the Todo module
  export class Todo {
	id: 		number;
	dateCreated: 	string;				// ISO 8601
	title: 		string;
	dateCompleted:	string;				// undefined for an incomplete Todo item. Good idea??

	/**
	* returns true if the todo item is complete
	* @return complete boolean
	*/
	isComplete():boolean {				// seems superfluous right now??
		return !!this.dateCompleted;
	}
  }
}

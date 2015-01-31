'use strict';

/**
*   The definition of the Todo object that will be used throughout the app
*/

module  Todo {	    					// each class is defined within the Todo module
  export class Todo {
	id: 		    string;
	title: 		    string;
	dateCreated: 	string;		
	dateCompleted:	string;				// undefined for an incomplete Todo item. Good idea??


	/*

		FROM AN OO DESIGN PERSPECTIVE, THE METHOD BELOW IS CORRECT. HOWEVER THIS CAUSES ISSUES IN MANY JAVASCRIPT LIBRARIES (eg LAWNCHAIR) WHICH TRY TO 
		CLONE THE OBJECT. THEREFORE KEEP OBJECTS DEVOID OF ANY CODE.

	isComplete():boolean {		
		return !!this.dateCompleted;
	}
	*/
  }
}

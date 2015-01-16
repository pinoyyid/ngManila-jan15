'use strict';

/**
*   The definition of the Todo object that will be used throughout the app
*/

class Todo {
	id: 		number;
	dateCreated: 	string;				// ISO 8601
	title: 		string;
	complete = false;
	dateCompleted:	string;				// undefined for an incomplete Todo item
}

'use strict';
/**
*   The definition of the Todo object that will be used throughout the app
*/
var Todo = (function () {
    function Todo() {
    }
    /**
    * returns true if the todo item is complete
    * @return complete boolean
    */
    Todo.prototype.isComplete = function () {
        return !!this.dateCompleted;
    };
    return Todo;
})();

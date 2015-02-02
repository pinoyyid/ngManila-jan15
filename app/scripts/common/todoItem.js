'use strict';
/**
*   The definition of the Todo object that will be used throughout the app
*/
var Todo;
(function (_Todo) {
    var Todo = (function () {
        function Todo() {
            this.status = 'needsAction'; // 'completed' or 'needsAction'
        }
        return Todo;
    })();
    _Todo.Todo = Todo;
})(Todo || (Todo = {}));

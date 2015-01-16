/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../common/todoItem.ts"/>
'use strict';
var Data = (function () {
    function Data() {
        this.allTodoItemsArray = [];
        // populate the data model, eg from a REST service or from local storage (or both)
    }
    return Data;
})();
angular.module('ngtodoApp').service('Data', Data);

/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../common/todoItem.ts"/>
'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Todo;
(function (Todo) {
    var HackBase = (function () {
        function HackBase() {
            this.sig = 'HackBase'; // I always do this to help debugging DI, and as my first test
            this.foo = 'bar';
            console.log('HackBase constructor');
            this.foo = 'constrcurted foo';
        }
        return HackBase;
    })();
    Todo.HackBase = HackBase;
    var HackSub = (function (_super) {
        __extends(HackSub, _super);
        function HackSub() {
            _super.call(this);
            this.foo = 'sub constructed foo';
        }
        return HackSub;
    })(HackBase);
    Todo.HackSub = HackSub;
})(Todo || (Todo = {}));
angular.module('ngtodoApp').service('HackSub', Todo.HackSub);

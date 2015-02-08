/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../common/todoItem.ts"/>
'use strict';

module Todo {
    export class HackBase {
        sig = 'HackBase'; // I always do this to help debugging DI, and as my first test
        foo = 'bar';
        constructor() {
            console.log('HackBase constructor');
            this.foo = 'constrcurted foo';
        }
    }
    export class HackSub extends HackBase {
        constructor() {
            super();
            this.foo = 'sub constructed foo';
        }
    }
}

angular.module('ngtodoApp')
    .service('HackSub', Todo.HackSub);

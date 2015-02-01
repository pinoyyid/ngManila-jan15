/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>
/// <reference path="../services/datamodel_methods_s.ts"/>

'use strict';


module Todo {

    export class HackCtrl {
        sig = 'HackCtrl'; // I always do this to help debugging DI, and as my first test
        dm: DMMethods; // a reference to the DataModel Methods service
        q: ng.IQService;

        newTitle = '';

        static $inject = ['DMMethods', '$q'];
        constructor(DMMethods, $q) {
            this.dm = DMMethods;
            this.q = $q;
        }


        /**
         * called when the doit button is pressed
         */
        doit() {
            console.log(1111);
        }
    }
}

angular.module('ngtodoApp').controller('HackCtrl', Todo.HackCtrl)
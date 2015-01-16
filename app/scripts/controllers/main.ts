/// <reference path="../../../tsdefs/angularjs/angular.d.ts"/>

'use strict';

// Optional. Defines the contract between JS and HTML
interface IMainCtrl {
	sig:string;					// [provide info for HTML designer here]
	aSimpleFunction:()=>string;			// [provide info for HTML designer here]
}


class MainCtrl implements IMainCtrl {
	sig = 'MainCtrl';				// I always do this to help debugging DI, and as my first test

	static $inject = ['$scope'];			// allows safe minification
	constructor($scope) {
		$scope.vmm = this;			// thus {{vmm.sig}} within the HTML
	}

	aSimpleFunction() {
		return 'foo';
	}

}
angular.module('ngtodoApp').controller('MainCtrl',MainCtrl)

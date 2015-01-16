'use strict';

describe('Controller: TodoCCtrl', function () {

  // load the controller's module
  beforeEach(module('ngtodoApp'));

  var TodoCCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodoCCtrl = $controller('TodoCCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Service: DMMethods', function () {

  // load the service's module
  beforeEach(module('ngtodoApp'));

  // instantiate service
  var DMMethods;
  beforeEach(inject(function (_DMMethods_) {
    DMMethods= _DMMethods_;
  }));

  it('should be instantiated', function () {
    expect(!!DMMethods).toBe(true);
  });

  it('should have the correct sig', function () {
    expect(DMMethods.sig).toBe('DMMethods');
  });

 it('should have an array of Todo items', function () {
    var len = DMMethods.datamodel.allTodoItemsArray.length;
    expect(len > -1).toBe(true);
  });


});

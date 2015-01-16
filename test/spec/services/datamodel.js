'use strict';

describe('Service: Datamodel', function () {

  // load the service's module
  beforeEach(module('ngtodoApp'));

  // instantiate service
  var Datamodel;
  beforeEach(inject(function (_Datamodel_) {
    Datamodel = _Datamodel_;
  }));

  it('should do something', function () {
    expect(!!Datamodel).toBe(true);
  });

});

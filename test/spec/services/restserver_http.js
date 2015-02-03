'use strict';

describe('Service: RestServer', function () {

  // load the service's module
  beforeEach(module('ngtodoApp'));

  // instantiate service
  var RestServer;
  beforeEach(inject(function (_RestServer_) {
    RestServer= _RestServer_;
  }));

  it('should be instantiated', function () {
    expect(!!RestServer).toBe(true);
  });

  it('should have the correct sig', function () {
    expect(RestServer.sig).toBe('RestServer');
  });


});

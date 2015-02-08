'use strict';

describe('Service: HackSub', function () {

  // load the service's module
  beforeEach(module('ngtodoApp'));

  // instantiate service
  var HackSub;
  beforeEach(inject(function (_HackSub_) {
    HackSub= _HackSub_;
  }));

  it('should be instantiated', function () {
    expect(!!HackSub).toBe(true);
  });

  it('should have the correct sig', function () {
    expect(HackSub.sig).toBe('HackBase');
  });

 it('should have set foo = sub foo', function () {
    expect(HackSub.foo).toBe('sub constructed foo');;
  });


});

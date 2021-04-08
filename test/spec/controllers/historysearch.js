'use strict';

describe('Controller: HistorysearchCtrl', function () {

  // load the controller's module
  beforeEach(module('gridApp'));

  var HistorysearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HistorysearchCtrl = $controller('HistorysearchCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HistorysearchCtrl.awesomeThings.length).toBe(3);
  });
});

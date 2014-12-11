"use strict";

describe('ItemListCtrl', function () {
  var $scope, $rootScope, createController, Links, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('App'));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('ItemListCtrl', {
        $scope: $scope
      });
    };
  }));

  it('should have a initial data in the $scope', function() {
    createController();
    expect($scope.tip).to.equal(false);
    expect($scope.cartTip).to.equal(false);
  });

  it('should have addItem, getItemId, map, and clearItem functions', function() {
    createController();
    console.log('$scope.showTip', $scope.showTip);
    //expect($scope.showTip).to.be.a('function');
    // expect($scope.getItemId).to.be.a('function');
    // expect($scope.map).to.be.a('function');
    // expect($scope.clearItem).to.be.a('function');
  });

  
});

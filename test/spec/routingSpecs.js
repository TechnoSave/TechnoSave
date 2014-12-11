// TODO: complete routing testing

describe('Routing', function () {
  var $route;
  beforeEach(module('App'));

  beforeEach(inject(function($injector){
    $route = $injector.get('$route');
  }));

  it('Should have / route, template, and controller', function () {
    //expect($route.routes['/']).to.be.ok();
    //expect($route.routes['/'].controller).to.be('ItemListCtrl');
    //expect($route.routes['/'].templateUrl).to.be('app/auth/partial-items.html');
  });

});

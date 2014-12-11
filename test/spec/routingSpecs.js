describe('Routing', function () {
  var $route;
  beforeEach(module('App'));

  beforeEach(inject(function($injector){
    $route = $injector.get('$route');
  }));

  it('Should have / route, template, and controller', function () {
    expect($route.routes['/']).to.be.ok();
    expect($route.routes['/'].controller).to.be('ItemListCtrl');
    expect($route.routes['/'].templateUrl).to.be('app/auth/partial-items.html');
  });

  // it('Should have /signin route, template, and controller', function () {
  //   expect($route.routes['/signin']).to.be.ok();
  //   expect($route.routes['/signin'].controller).to.be('AuthController');
  //   expect($route.routes['/signin'].templateUrl).to.be('app/auth/signin.html');
  // });

  // it('Should have /links route, template, and controller', function () {
  //   expect($route.routes['/links']).to.be.ok();
  //   expect($route.routes['/links'].controller).to.be('LinksController');
  //   expect($route.routes['/links'].templateUrl).to.be('app/links/links.html');
  // });

  // it('Should have /shorten route, template, and controller', function () {
  //   expect($route.routes['/shorten']).to.be.ok();
  //   expect($route.routes['/shorten'].controller).to.be('ShortenController');
  //   expect($route.routes['/shorten'].templateUrl).to.be('app/shorten/shorten.html');
  // });
});

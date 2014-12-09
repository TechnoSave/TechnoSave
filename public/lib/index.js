var app = angular.module('App', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partial-items.html'
    });

    $urlRouterProvider.otherwise('/');
});


app.controller('ItemListCtrl', ['$scope', '$http', function ($scope, $http) {
  
  console.log('ItemListCtrl was loaded!');
  $scope.tip = false;
  $scope.cartTip = false;

  var showTip = function(){
    $scope.cartTip = true;
  };

  var hideTip = function(){
    $scope.cartTip = false;
  };

  $scope.addItem = function() {
    $http.post('/', {items: $scope.inputModel})
      .success(function(data){
        if($scope.items === undefined){
          showTip();
          setInterval(hideTip, 3000);
        }
        $scope.items = $scope.items || [];
        data.forEach(function(item){
          $scope.items.push(item);
        });
      });
  };

  $scope.addToCart = function($event) {
    $scope.cart = $scope.cart || [];
    var item = angular.element($event.currentTarget);
    var cart = angular.element(document.querySelector('#cart'));
      console.log(cart.append);
    cart.append(item.detach());
  };

}]);
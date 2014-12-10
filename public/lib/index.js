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

  var animate = function(){
    $('#form').animate({
      marginTop: "80px"
      
    }, 1000 );
  };
  //*****  post and get from API ******//
  $scope.addItem = function() {
    $http.post('/', {items: $scope.inputModel})
      .success(function(data){
        animate();
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

  //*****  CART ******//
  $scope.addToSummary = function($event, name) {
    // console.log(name)
    // $scope.cart = $scope.cart || [];
    // var item = angular.element($event.currentTarget);
    // console.log(item);
    // var cart = angular.element(document.querySelector('#cart'));
    // cart.append(item.detach());
  };
  var sum = 0;

  $scope.getItemId = function (name, price, store) {
    $scope.cart = $scope.cart || [];
    var item = { 
                  name: name,
                  price: price,
                  store: store
                }
    $scope.cart.push(item);
    // calculate total price in summary table
    for (var i = 0; i < $scope.cart.length; i++) {
      sum += $scope.cart[i].price;
      $scope.total = sum;
    }   
  };

}]);
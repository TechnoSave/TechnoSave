var app = angular.module('App', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partial-items.html'
    })
    .state('map', {
      url: '/map',
      templateUrl: 'map.html'
    });

    $urlRouterProvider.otherwise('/');
});


app.controller('ItemListCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  
  
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
        if(data.length === 0){
          $scope.empty = true;
          $scope.items = undefined;
          return;
        }else{
          $scope.empty = false;
        }
        if($scope.items === undefined){
          showTip();
          setInterval(hideTip, 3000);    
        }
        $scope.items = [];
        data.forEach(function(item){
          $scope.items.push(item);
        });
      });
  };

  //*****  Summary ******//
  var sum = 0;
  $scope.getItemId = function (name, price, store) {
    $scope.cart = $scope.cart || [];
    console.log('$scope.cart', $scope.cart)
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

  //they clicked the map button in shopping list
  $scope.map = function(){
    $location.path("/map");
  };

  $scope.clearItem = function(index){
    console.log('clicked', index);
    $scope.cart.splice(index, 1);
  };
}]);

//*****  Map ******//
app.controller('MapCtrl', ['$scope', '$http', function ($scope, $http) { 
  //get location data, start render cascade
  var map;
  var infowindow;
  //map all electronics stores with keyword "Best Buy"
  geoMap("Best Buy", ['electronics_store']);
  //map all electronics stores with keyword "Walmart"
  geoMap("Walmart", ['electronics_store']);
}]);

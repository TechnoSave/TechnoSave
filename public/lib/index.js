angular.module('App', ['ui.router'])

//*****  Route Config ******//
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
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
    // default router
    $urlRouterProvider.otherwise('/');
})

//*****  ItemList controller ******//
.controller('ItemListCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  
  //*****  main page animation ******//
  var animate = function(){
    $('#form').animate({
      marginTop: "-8%"
      
    }, 1000 );
  };

  var animateSummary = function(){
    $('.summaryTable').animate({
      marginRight: "60%",
      width: '50%'
      }, 1000 );
  };
  //*****  end of animation ******//

  //*****  post and get from API ******//
  $scope.addItem = function() {
    $http.post('/', {items: $scope.inputModel})
      .success(function(data){ 
        animate();
        if(data.length === 0){
          $scope.empty = true;
          $scope.items = undefined;
          return;
        }else{
          $scope.empty = false;
        }
        $scope.items = [];
        data.forEach(function(item){
          $scope.items.push(item);
        });
      });
  };

  // calculate total price in summary table
  $scope.calculateSum = function(){
    var sum = 0;
    for (var i = 0; i < $scope.cart.length; i++) {
      sum += $scope.cart[i].price;
      $scope.total = sum;
    } 
  };

  //*****  Summary Table ******//
  $scope.getItemId = function (name, price, store) {
    $scope.cart = $scope.cart || [];
    var item = { 
                  name: name,
                  price: price,
                  store: store
                }
    $scope.cart.push(item);
    $scope.calculateSum(); 
  };

  //they clicked the map button in shopping list
  $scope.map = function(){
    $location.path("/map");
  };
  // clear one item at a time
  $scope.clearItem = function(index){
    $scope.cart.splice(index, 1);
    $scope.calculateSum(); 
  };

  //*****  Compare Table ******//
  var diff;
  $scope.moveToCompare = function(name, price, store) {
    animateSummary();
    $scope.compare =  $scope.compare || [];
    var item = { 
                  name: name,
                  price: price,
                  store: store
                }
    if ($scope.compare.length < 2) {
      $scope.compare.push(item);
    }

    if ($scope.compare.length === 2) {
      diff = Math.abs($scope.compare[0].price - $scope.compare[1].price);
      $scope.diff = diff;
    }
  };
  // clear the compare list
  $scope.clear = function() {
    $scope.compare = [];
    $scope.diff = [];
  }
}])

//*****  Map Controller ******//
.controller('MapCtrl', ['$scope', '$http', function ($scope, $http) { 
  //get location data, start render cascade
  var map;
  var infowindow;
  //map all electronics stores with keyword "Best Buy"
  geoMap("Best Buy", ['electronics_store']);
  //map all electronics stores with keyword "Walmart"
  geoMap("Walmart", ['electronics_store']);
}]);

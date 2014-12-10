var app = angular.module('App', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

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

  //*****  post and get from API ******//
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

  //*****  CART ******//
  $scope.addToCart = function($event, name) {
    // console.log(name)
    // $scope.cart = $scope.cart || [];
    // var item = angular.element($event.currentTarget);
    // console.log(item);
    // var cart = angular.element(document.querySelector('#cart'));
    // cart.append(item.detach());
  };

  $scope.getItemId = function (name, price, store) {
    $scope.cart = $scope.cart || [];
    var item = { 
                  name: name,
                  price: price,
                  store: store
                }
    $scope.cart.push(item);
    console.log('$scope.cart', $scope.cart)
  };

}]);

app.controller('MapCtrl', ['$scope', '$http', function ($scope, $http) { 

  // // var stores = "BestBuy and Walmart near "
  // // //create listener for location data
  // // $scope.renderMap = function(locObj){

  // //   var map = $('<iframe width="600" height="450" frameborder="0" style="border:0"
  // //     src="https://www.google.com/maps/embed/v1/place?q='+stores+locObj.latitude+','+locObj.longitude+'&key=AIzaSyAxSYBGoDmMO7_cxA4YPMQRY-SR3MAsC1c">
  // //     </iframe>');

  // //   $('#mapDiv').append(map);
  // // }

  // $scope.$watch(
  //               function() { return $('#geoPos').data().longitude },
  //               function() {
  //                            $scope.loc = $('#geoPos').data();
  //                          }
  //            );

  // $scope.$watch(
  //               function() { return $scope.loc },
  //               function() {
  //                             if($scope.loc.longitude){
  //                               $scope.genLocRect(newVal);
  //                             }
  //                           }
  //            );

  // $scope.genLocRect = function(loc){
  //   var radius = 10;
  //     //stub out variable into scope model that user can edit
  //   //generate lat/long rect
  //   console.log(loc);
  //   var latLng = new google.maps.LatLng(loc.latitude, loc.longitude);
  //   var circle = new google.maps.Circle({center: latLng, radius: radius}); 
  //   var defaultBounds = circle.getBounds();
  //   console.log(defaultBounds);
  // }

  //get location data, start render cascade
  var map;
  var infowindow;
  var storeKeyword = "Best Buy";
  geoMap(storeKeyword);
    //access the data at $('#geoPos').data()

  // var request = {
  //   location, 
  //   radius,
  //   name = "BestBuy"
  // };

  // service = new google.maps.places.PlacesService(map);
  // service.nearbySearch(request, callback);

  // geoInit()
//google.maps.event.addDomListener(window, 'load', geoInit);


}]);

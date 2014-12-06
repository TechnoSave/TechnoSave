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
  //dummy data
  var item1 = {
    name: "tomato",
    price: 4
  };
  var item2 = {
    name: "apple",
    price: 5
  };
  var item3 = {
    name: "potato",
    price: 3
  };

  var items = [item1, item2, item3];
  console.log(items);

  $scope.addItem = function() {
    $http.post('/*', {items: $scope.itemsModel})
      .success(function(data){
        console.log('data from server', data);
        // sample data recieved
        $scope.items = items;  //TOBE: $scope.items = data;
      });
  };
}]);
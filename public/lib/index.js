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

  $scope.addItem = function() {
    $http.post('/', {items: $scope.inputModel})
      .success(function(data){
        
        $scope.items = $scope.items || [];

        data.forEach(function(item){
          $scope.items.push(item);
        });
        console.log($scope.items);

      });
  };

  $scope.addToCart = function(element) {
    $scope.cart = $scope.cart || [];
    $scope.cart.push(element);
    for(var i = 0; i < $scope.items.length; i++){
      if($scope.items[i] === element){
        $scope.items[i].splice(i, 1);
      }
    }
  };

}]);
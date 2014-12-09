var app = angular.module('App', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partial-items.html'
    });

    $urlRouterProvider.otherwise('/');
});


app.controller('ItemListCtrl', ['$scope', '$http', 'ListItems',  function ($scope, $http, ListItems) {
  
  console.log('ItemListCtrl was loaded!');

  //hide table results when the app loaded
  //$('.table').hide();
  //$scope.ListItems = ListItems;
  $scope.addItem = function() {
    $http.post('/', {items: $scope.itemsModel})
      .success(function(data){
        //$('#form').fadeOut();
        //$('.table').fadeIn();
        console.log('data from server', data);
        // sample data recieved
        $scope.ListItems = data;  
      })
      .error(function(){
        $('.error').html('Oops! Something went wrong.').addClass('alert');
      })
  };
}])

.factory('ListItems', function(){
  var name = "tomato";
  var price = 5;
  return {
    name: name,
    price: price
  }
});
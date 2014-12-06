var app = angular.module('App', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partial-items.html'
    });

    $urlRouterProvider.otherwise('/');
});


app.controller('ItemListCtrl', ['$scope', function ($scope) {
  
  console.log('ItemListCtrl was loaded!');

  $scope.addItem = function() {
    console.log("clicked");
  };


}]);
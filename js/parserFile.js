var request = require('request');

    //==============Walmart API URIs======================
    var searchUrl = 'http://api.walmartlabs.com/v1/search';
    var itemIDLookupUrl = 'http://api.walmartlabs.com/v1/items/';
    var APIKey = '4z8pkk2ycuvewyydr4mf3ha5';
    //==============Walmart API URIs======================

module.exports = {
  parser : function(req, res){


    //go through essams client POST data
    var itemsList = req.body.items.replace(/ /g,'').split(','); 

    //https://docs.angularjs.org/api/ng/service/$http
    itemsList.forEach(function(item){
      var testItem = "https://api.walmartlabs.com/v1/search?apiKey=4z8pkk2ycuvewyydr4mf3ha5&query=tomato";
      var getData = (searchUrl + '?apiKey=' + APIKey + '&query=' + item);
     //http://api.walmartlabs.com/v1/search?apiKey=4z8pkk2ycuvewyydr4mf3ha5&query=potato
      $http.get(testItem)     
      .success(function(data){
        console.log('data from server', data);
      })
      .error(function(){
        console.log('ERROR!!!!!!!!!!!!!!!');
      });
  })


  res.send(req.body.items);

  }
};

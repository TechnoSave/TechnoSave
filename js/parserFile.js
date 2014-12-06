var request = require('request');

    //==============Walmart API URIs======================
    var searchUrl = 'http://api.walmartlabs.com/v1/search';
    var itemIDLookupUrl = 'http://api.walmartlabs.com/v1/items/';
    var APIKey = '4z8pkk2ycuvewyydr4mf3ha5';
    //==============Walmart API URIs======================

module.exports = {
  parser : function(req, res){
    var itemsList = req.body.items.replace(/ /g,'').split(','); 
    itemsList.forEach(function(item){
    var getData = (searchUrl + '?apiKey=' + APIKey + '&query=' + item);
    request(getData, function(error, response, body){
      console.log(body);
        res.send(body);
    }); 
    });
  }
}  

//"http://api.walmartlabs.com/v1/search?apiKey=4z8pkk2ycuvewyydr4mf3ha5&query=tomato"
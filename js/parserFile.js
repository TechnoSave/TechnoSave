var Promise = require("bluebird");
var request = Promise.promisify(require('request'));
 
    //==============Walmart API URIs======================
    var searchUrl = 'http://api.walmartlabs.com/v1/search';
    var itemIDLookupUrl = 'http://api.walmartlabs.com/v1/items/';
    var APIKey = '4z8pkk2ycuvewyydr4mf3ha5';
    //==============Walmart API URIs======================
 
module.exports = {
  parser : function(req, res){
    //create itemsList array of user inputs, whitespace sanitized and put in array
    var itemsList = req.body.items.replace(/ /g,'').split(','),
        output = [],
        max = 1;

    //go through itemsList array of user inputs and get price for each from Wal-Mart API
    for(var i = 0; i < itemsList.length; i++){
        //construct GET url
        var getURL = (searchUrl + '?apiKey=' + APIKey + '&query=' + itemsList[i]);
       
        //ask walmart API for data
        request(getURL)
        //async callback to parse data
        .then(function(data){
            //create list of item objects - limited to var "max" results per item.
            var apiItemsList = JSON.parse(data[0].body).items.slice(0, max);
           
            //for list of matching products, trim object and add to output  
            apiItemsList.forEach(function(itemObj){
                //construct new item object
                var apiItem = {};

                //get price, itemID, and name
                    //if salePrice does not exist, default to MSRP
                apiItem.price = itemObj.salePrice || itemObj.msrp;
                apiItem.itemId = itemObj.itemId;
                apiItem.name = itemObj.name;
                
                //store item info obj (that is a possible match) into the output
                output.push(apiItem);
            });

            //if query that just finished is the last item in the search terms,
            //send data back to client
            if(data[0].request.req.path.slice(49) === itemsList[itemsList.length-1]){
                res.send(output);
            } 
        });
    }
  }
}
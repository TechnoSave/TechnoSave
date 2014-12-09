var Promise = require("bluebird");
<<<<<<< HEAD
>>>>>>> dabd7e6b606ef6ab3a3bd5b037e5056227f52cc7
=======
var request = Promise.promisify(require('request'));
>>>>>>> a471a203c5187919f9c3daee670db9bd1dbc8af3
 
    //==============Walmart API URIs======================
    var searchUrl = 'http://api.walmartlabs.com/v1/search';
    var itemIDLookupUrl = 'http://api.walmartlabs.com/v1/items/';
    var APIKey = '4z8pkk2ycuvewyydr4mf3ha5';
    //==============Walmart API URIs======================

    //==============BestBuy API URIs======================
    var BBsearchUrl = 'http://api.remix.bestbuy.com/v1/products';
    var BBAPIKey = '3fywvy298naxeed665ex82z5';
    //==============BestBuy API URIs======================
 
module.exports = {
  parser : function(req, res){
    //create itemsList array of user inputs, whitespace sanitized and put in array
    var itemsList = req.body.items.replace(/ /g,'').split(','),
        output = [],
<<<<<<< HEAD
        i,
        done = 0,
        notSent = true,
        max = 1;
 
    //create event listener to listen when list of walmart requests finish
    var walmartAPI = new events.EventEmitter();
   
    var sendList = function (){
    // //do something in here - we have access to output - which is an array of all possible items objs
    //     //-not structured well, is an array of 10 possible matches for every input item, so possibly 10*n items
    //     //itemsList[i].price, .itemId, .name;
       
        res.send(output);
    };
 
    //aysnc calls are queued in sync time
    //if apiComplete flag is true , then the last of the async calls have completed
    walmartAPI.on('Finished Requests', sendList);
=======
        max = 1,        //number of matching requests per API per item
        APIs = 2,       //number of APIs were using
        completed = 0,  //number of completed async http req
        queued = itemsList.length*APIs*max; //number of queued async http req
>>>>>>> a471a203c5187919f9c3daee670db9bd1dbc8af3

    //go through itemsList array of user inputs and get price for each from Wal-Mart API
    for(var i = 0; i < itemsList.length; i++){
        //construct GET url
        var getURL = (searchUrl + '?apiKey=' + APIKey + '&query=' + itemsList[i]);
        //http://api.remix.bestbuy.com/v1/products(name=cable*)?show=name,salePrice,sku&format=json&apiKey=3fywvy298naxeed665ex82z5
        var BBgetURL = (BBsearchUrl + '(name=' + itemsList[i] + '*)?show=name,salePrice,sku&format=json' + '&apiKey=' + BBAPIKey);

        //=================Walmart API requests====================
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
                apiItem.store = "WalMart";
                
                //store item info obj (that is a possible match) into the output
                output.push(apiItem);
                completed++;
            });

            //if query that just finished is the last item in the search terms,
            //send data back to client
            if(completed === queued){
                res.send(output);
            } 
        });
        //=================Walmart API requests====================

        //=================BestBuy API requests====================
        //ask walmart API for data
        request(BBgetURL)
        //async callback to parse data
        .then(function(data){
            //create list of item objects - limited to var "max" results per item.
            var apiItemsList = JSON.parse(data[0].body).products.slice(0, max)
            
            //for list of matching products, trim object and add to output  
            apiItemsList.forEach(function(itemObj){
                //construct new item object
                var apiItem = {};

                //get price, itemID, and name
                    //if salePrice does not exist, default to MSRP
                apiItem.price = itemObj.salePrice;
                apiItem.itemId = itemObj.sku;
                apiItem.name = itemObj.name;
                apiItem.store = "BestBuy";
                
                //store item info obj (that is a possible match) into the output
                output.push(apiItem);
                completed++;
            });

            //if query that just finished is the last item in the search terms,
            //send data back to client
            if(completed === queued){
                res.send(output);
            } 
        });
        //=================BestBuy API requests====================
    }
  }
}

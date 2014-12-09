var request = require('request');
var events = require('events');
var Promise = require("bluebird");
 
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

    //go through itemsList array of user inputs and get price for each from Wal-Mart API
    for(i = 0; i < itemsList.length; i++){
        //construct GET url
        var getURL = (searchUrl + '?apiKey=' + APIKey + '&query=' + itemsList[i]);
       
        request(getURL, function (error, response, body) {
            var apiItemsList = JSON.parse(body).items.slice(0, max);
           
            //here we have access to walmart API's response to item search - list of matching products  
            apiItemsList.forEach(function(itemObj){
                //construct item info from API return
                var apiItem = {};
 
                //get price, itemID, and name
                apiItem.price = itemObj.msrp || itemObj.salePrice;
                apiItem.itemId = itemObj.itemId;
                apiItem.name = itemObj.name;
                
                //store item info obj (that is a possible match) into the output
                output.push(apiItem);
            });
 
            done++;
        });
    }
 

    var check = function(){
        if(done === itemsList.length && notSent){
            walmartAPI.emit('Finished Requests');
            notSent = false;
        }
    }

    //for loop completed, parse accumulated data and send it
    setInterval(check, 500);
  }
}
 
            //============deprecated=========
                // //execute GET url request
                // .get(getData)
                // //async success callback
                // .on('response', function(response){
                //     console.log("====================");
                //     console.log(Object.keys(response));
                //     console.log("====================");
                //     var apiItemsList = response.body.items;
                //     //here we have access to walmart API's response to item search - list of matching products
                //      apiItemsList.forEach(function(itemObj){
                //         //construct item info from API return
                //         var apiItem = {};
                //         //get price, itemID, and name
                //         apiItem.price = itemObj.msrp;
                //         apiItem.itemId = itemObj.itemId;
                //         apiItem.name = itemObj.name;
                //         //store item info obj (that is a possible match) into the output
                //         output.push(apiItem);
                //      });
 
                //     //signal end of all async calls
                //     if(i == itemsList.length-1){
                //         walmartAPI.emit('Finished Requests');
                //     }
                // });
            //============deprecated=========
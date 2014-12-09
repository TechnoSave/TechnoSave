var request = require('request');
var events = require('events');

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
        i;

    //create event listener to listen when list of walmart requests finish
    var walmartAPI = new events.EventEmitter();
    

    var sendList = function (){
    //do something in here - we have access to output - which is an array of all possible items objs
        //-not structured well, is an array of 10 possible matches for every input item, so possibly 10*n items
        //itemsList[i].price, .itemId, .name;
        
        // itemsList.forEach(function(itemObj){
        //     output.push(itemObj)
        // })
        
        res.send(output);
    }
    //go through itemsList array of user inputs and get price for each from Wal-Mart API
    for(var i = 0; i < itemsList.length; i++){
        //construct GET url
        var getData = (searchUrl + '?apiKey=' + APIKey + '&query=' + itemsList[i]);
            request
                //execute GET url request
                .get(getData)
                //async success callback
                .on('response', function(response){       
                  console.log("parserFile LINE 28: ", response.body.items);
                    var apiItemsList = response.body.items;
                    //here we have access to walmart API's response to item search - list of matching products
                     apiItemsList.forEach(function(itemObj){
                        //construct item info from API return
                        var apiItem = {};
                        //get price, itemID, and name
                        apiItem.price = itemObj.msrp;
                        apiItem.itemId = itemObj.itemId;
                        apiItem.name = itemObj.name;
                        //store item info obj (that is a possible match) into the output
                        output.push(apiItem);
                     });

                    //signal end of all async calls
                    if(i == itemsList.length-1){
                        walmartAPI.emit('Finished Requests');
                    }
                }); 


    //aysnc calls are queued in sync time
<<<<<<< Updated upstream
    //if apiComplete flag is true , then the last of the async calls have completed
    walmartAPI.on('Finished Requests', sendList);
    
    //go through itemsList array of user inputs and get price for each from Wal-Mart API
    for(i = 0; i < itemsList.length; i++){
        //construct GET url
        var getURL = (searchUrl + '?apiKey=' + APIKey + '&query=' + itemsList[i]);
        
        request(getURL, function (error, response, body) {
            var apiItemsList = JSON.parse(body).items;
            
            //here we have access to walmart API's response to item search - list of matching products  
            apiItemsList.forEach(function(itemObj){
                //construct item info from API return
                var apiItem = {};
                
                //get price, itemID, and name
                apiItem.price = itemObj.msrp;
                apiItem.itemId = itemObj.itemId;
                apiItem.name = itemObj.name;
                
                //store item info obj (that is a possible match) into the output
                output.push(apiItem);
            });

            if(i === apiItemsList.length-1){
                walmartAPI.emit('Finished Requests');
            }
        });
    }

    //for loop completed, parse accumulated data and send it
    walmartAPI.emit('Finished Requests');
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

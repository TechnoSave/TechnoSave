module.exports = {
  parser : function(req, res){
    res.send(req.body.items);
  }
}
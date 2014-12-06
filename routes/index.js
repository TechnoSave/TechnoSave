var express = require('express');
var router = express.Router();
  //EDIT ME
var model = require('../js/parserFileName.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/*', function(req, res) {
    //EDIT ME
  js.parserFunctionName(req, res);
});

module.exports = router;

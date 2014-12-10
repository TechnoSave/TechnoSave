var express = require('express');
var router = express.Router();
var js = require('../js/parserFile.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: "Techno$ave" });
});

router.post('/', function(req, res) {
  js.parser(req, res);
});

module.exports = router;

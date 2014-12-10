var express = require('express');
var router = express.Router();
var js = require('../js/parserFile.js');

/* GET home page. */
router.get('/', function(req, res) {
<<<<<<< HEAD
  res.render('index', { title: "Techno$ave" });
=======
  res.render('index', { title: "TechnoSave" });
>>>>>>> c85e94bff19d192583b2dd42f53573e5b5717a05
});

router.post('/', function(req, res) {
  js.parser(req, res);
});

module.exports = router;

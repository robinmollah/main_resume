let express = require('express');
let router = express.Router();
let data = require('../src/csv-parser');

router.get('/', function(req, res, next) {
	res.render('index', {data: data.fetch()});
});

router.get('/covid19', (req, res) => {
  res.render('covid19/index', {data: data.fetch()});
});

router.get('/review', (req, res) => {
	res.render('review/index', {});
});

module.exports = router;

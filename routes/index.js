let express = require('express');
let router = express.Router();
let data = require('../src/csv-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.headers.host.indexOf('covid19') > -1 || req.headers.host.indexOf('corona') > -1) {
		console.log(req.headers.host.indexOf('covid19'), req.headers.host.indexOf('corona'));
		res.render('covid19/index', {data: data.fetch()});
	} else {
		res.render('covid19/index', {data: data.fetch()});
	}
});

router.get('/covid19', (req, res) => {
  res.render('covid19/index', {data: data.fetch()});
});

module.exports = router;

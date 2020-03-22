let express = require('express');
let router = express.Router();
let data = require('../src/csv-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/covid19', (req, res) => {
  res.render('covid19/index', {data: data.fetch()});
});

module.exports = router;

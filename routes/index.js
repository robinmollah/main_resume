let express = require('express');
let router = express.Router();
let data = require('../src/csv-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/covid19', (req, res) => {
  data.data().then(response => {
    console.log(response);
    res.render('covid19/index', {data: response});
  }).catch(err => {
    console.log("Error reading file.", err);
  });
});

module.exports = router;

let express = require('express');
let router = express.Router();
let data = require('../src/csv-parser');
let insertReview = require('../src/submit_review').insertReview;

router.get('/', function(req, res, next) {
	res.render('index', {data: data.fetch()});
});

router.get('/covid19', (req, res) => {
  res.render('covid19/index', {data: data.fetch()});
});

router.get('/review', (req, res) => {
	res.render('review/index', {});
});

router.post('/review/submit', async (req, res) => {
	console.log("Request", JSON.stringify(req.body.answers), req.body.id);
	insertReview(req.body.answers, req.body.id).then(response => {
		console.log("Review", response);
		res.json({message: true});
	}).catch(error => {
		console.log("Submission error", error);
	});

});

module.exports = router;

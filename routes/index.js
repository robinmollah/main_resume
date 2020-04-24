let express = require('express');
let router = express.Router();
let data = require('../src/csv-parser');
let insertReview = require('../src/submit_review').insertReview;

router.get('/', function(req, res, next) {
	console.log(req.headers.host);
	if(req.headers.host.indexOf("covid19") == 0){
		res.render('covid19/index', {data: data.fetch()});
	} else if(req.headers.host.indexOf("review") == 0){
		res.render('review/index', {});
	} else {
		res.render('index', {data: data.fetch()});
	}
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

router.get('/review/chat/:id', (req, res) => {
	res.json({message: "Chat is not initialised yet. Visit after 24 hours.", id: req.params.id});
});

router.get('/review/chat', (req, res) => {
	res.json({message: "Chat is not initialised yet. Visit after 24 hours.", id: req.params.id});
});

module.exports = router;

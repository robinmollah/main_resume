const express = require('express');
const router = express.Router();
const db = require('../db');
const isUri = require('valid-url').isUri;

function makeid(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() *
			charactersLength));
	}
	return result;
}

router.get('/url/list', async (req, res) => {
	const db_result = await db.collection('url-shortener');
	const snapshot = await db_result.get();
	let list = [];
	snapshot.forEach(doc => {
		console.log(doc.id, '=>', doc.data());
		list.push(doc.data());
	});
	res.json({
		result: list
	});
});

// SET short_url for a long_URL
router.post('/url', async (req, res) => {
	const trail = req.body.short_url || makeid(8);

	if(!isUri(req.body.long_url)){
		res.json({
			status: false,
			message: "Not a valid URL"
		});
		console.log(req.body);
		return;
	}
	const data = {
		long_url: req.body.long_url,
		short_url: trail,
		created_at: Date.now()
	};

	db.collection('url-shortener')
		.doc(trail)
		.set(data)
		.then(db => {
			console.log("SET ", db);
			res.json({
				short_url: trail,
				long_url: req.body.long_url
			});
		})
		.catch(err => {
			console.error(err);
			res.json({
				status: false,
				message: err.message
			});
		})
});

// UPDATE long_url
router.patch('/url/:short_url', (req, res) => {
	const db_result = db.collection('url-shortener')
		.doc(req.params.short_url)
		.update({
			long_url: req.body.long_url
		});
	db_result.then(() => {
		console.log(req.params.short_url, req.body.long_url);
		res.json({
			statue: true
		});
	}).catch(err => {
		console.error(err.code);
		if(err.code === 5){
			res.json({
				status: false,
				message: "There is no short url for " + req.params.short_url
			})
		} else {
			res.redirect("https://robin.engineer");
		}
	});
});

// GET long_url
router.get('/url/:short_url', async (req, res) =>{
	const db_result = db.collection('url-shortener').doc(req.params.short_url).get();
	db_result.then(doc => {
		console.log(doc.data().long_url, req.params.short_url);
		let data = doc.data();
		if(!data){
			res.redirect("https://robin.engineer");
		} else {
			res.redirect(data.long_url);
		}
	}).catch(err => {
		res.redirect("https://robin.engineer");
	});
});

module.exports = router;

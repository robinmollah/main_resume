const express = require('express');
const router = express.Router();
const db = require('../db');

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
	const trail = makeid(8);

	const data = {
		long_url: req.body.long_url,
		short_url: trail,
		created_at: Date.now()
	};

	const db_result = await db.collection('url-shortener').doc(trail).set(data);
	console.log("SET ", db_result);
	res.json({
		short_url: trail,
		long_url: req.body.long_url
	});
});

// UPDATE long_url
router.patch('/url/:short_url', (req, res) => {
	res.json({
		short_url: req.params.short_url,
		long_url: "https://google.com"
	});
});

// GET long_url
router.get('/url/:short_url', (req, res) =>{
	res.json({
		short_url: req.params.short_url
	});
});

module.exports = router;

const express = require('express');
const router = express.Router();

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

// SET short_url for a long_URL
router.post('/url', (req, res) => {
	res.json({
		short_url: Math.ceil(Math.random() * 10000)
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

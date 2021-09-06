const express = require('express');
const router = express.Router();
const multer  = require('multer');
const fileUpload = require('express-fileupload');
const HOSTING_DIR = '/sites/';
const path = require('path');
/*
 * Root path: SERVER/api/hosting
 */



router.get('/index', (req, res) => {
	res.send("hello world");
})

// TODO plan data recovery and portability
router.post("/upload", (req, res) => {
	console.log(req);
	// if(!req.files){
	// 	return res.status(400).send("No files were found");
	// }
	// if(!req.body.user_id){
	// 	return res.status(400).send("user_id not found");
	// }
	const file = req.files.file;
	const extensionName = path.extname(file.name);

	if(extensionName != ".zip"){
		return res.status(403).send("Forbidden file type");
	}

	const user_id = req.body.user_id;
	const location = __dirname + HOSTING_DIR + user_id + ".zip";

	file.mv(location, (err) => {
		if(err){
			return res.status(500).send(err);
		}

		return res.send({ status: "true", path: location });
	})
});

// Reference: https://sebhastian.com/express-fileupload/

module.exports = router;

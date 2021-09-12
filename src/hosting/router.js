const express = require('express');
const router = express.Router();
const HOSTING_DIR = '/sites/';
const path = require('path');
const unzipper = require('unzipper');
const fs = require('fs');
const db = require('../db');
const child_exec = require('child_process').exec;
/*
 * Root path: SERVER/api/hosting
 */

router.get('/index', (req, res) => {
	res.send("hello world");
})

// TODO plan data recovery and portability
router.post("/upload", (req, res) => {
	if(!req.files){
		return res.status(400).send("No files were found");
	}
	if(!req.body.user_id){
		return res.status(400).send("user_id not found");
	}
	const file = req.files.file;
	const extensionName = path.extname(file.name);

	if(extensionName != ".zip"){
		return res.status(403).send("Forbidden file type");
	}

	const user_id = req.body.user_id;
	const directory = __dirname + HOSTING_DIR + user_id;
	const location = directory + ".zip";
	let nginxConfigFile = "/home/ubuntu/nginx/hosting/" + req.body.user_id + ".conf";


	file.mv(location, (err) => {
		if(err){
			return res.status(500).send(err);
		}
		fs.createReadStream(location)
			.pipe(unzipper.Extract({ path: directory }));
		res.send({ status: "true",
			path: location, user_id: user_id });
	});
	fs.copyFile("/home/ubuntu/nginx/hosting/template",
		nginxConfigFile,
		(err) => {
			if(err){
				console.error(`Error copying file`, err);
			}
			fs.readFile(nginxConfigFile, 'utf8', function (err,data) {
				if (err) {
					return console.log(err);
				}
				let result = data.replace(/%subdomain%/g, req.body.user_id);

				fs.writeFile(nginxConfigFile, result, 'utf8', function (err) {
					if (err) return console.log(err);
					child_exec("sudo /etc/init.d/nginx reload", (err, stderr, stdout) => {
						console.log(err, stderr, stdout);
					})
				});
			});
		});
});

// Reference: https://sebhastian.com/express-fileupload/

module.exports = router;

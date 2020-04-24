const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore({
	projectId: 'robinsajin',
	keyFilename: './robinsajin-426baf1c4e48.json'});

const insertReview = (answers, ip) => datastore.save({
	key: datastore.key("test_review"),
	data: {
		answers: answers,
		timestamp: new Date(),
		id: ip
	},
}).then(response => {
	console.log("fasdf", response);
});

module.exports.insertReview = insertReview;
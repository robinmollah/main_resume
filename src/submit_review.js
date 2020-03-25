const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore();

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
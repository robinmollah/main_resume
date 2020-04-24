const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore({
	projectId: 'robinsajin',
	keyFilename: './robinsajin-426baf1c4e48.json'});

const insertMyName = name => {
	return datastore.save({
		key: datastore.key('name'),
		data: name
	}).then(response => {
		console.log("Res: ", response);
	});
};

const getNames = () => {
	const query = datastore.createQuery('name')
		.limit(10);
};

async function test()  {
	insertMyName({first_name: "Robin", last_name: "Mollah"}).then(console.log);
	await insertMyName({first_name: "Robin", last_name: "Easha"});
}

console.log("Inserting");
test().then(response => {
	console.log("Response", response);
}).catch(error => {
	console.log("Error", error);
});
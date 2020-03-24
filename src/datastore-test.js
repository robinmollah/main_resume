const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore();

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
	await insertMyName({first_name: "Robin", last_name: "Mollah"});
	await insertMyName({first_name: "Robin", last_name: "Easha"});
	
}

test().then(response => {
	console.log("Response", response);
}).catch(error => {
	console.log("Error", error);
});
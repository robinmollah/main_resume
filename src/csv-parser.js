const data = './src/covid19.csv';
const fs = require('fs');
const csv = require('csv-parser');

module.exports.data = function() {
	return new Promise((resolve, reject) => {
		let array = [];
		fs.createReadStream(data)
			.pipe(csv())
			.on('data', (row) => {
				array.push(row);
			})
			.on('end', () => {
				resolve(array);
			});
	});
};
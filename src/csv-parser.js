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

module.exports.fetch = () => {
	let array = [
		["Date", "Detected", "Death"],
		[new Date(2020, 3, 7),1,0],
		[new Date(2020, 3, 8),3,0],
		[new Date(2020, 3, 9),3,0],
		[new Date(2020, 3, 10),3,0],
		[new Date(2020, 3, 11),3,0],
		[new Date(2020, 3, 12),3,0],
		[new Date(2020, 3, 13),3,0],
		[new Date(2020, 3, 14),3,0],
		[new Date(2020, 3, 15),3,0],
		[new Date(2020, 3, 16),6,0],
		[new Date(2020, 3, 17),8,0],
		[new Date(2020, 3, 18),8,1],
		[new Date(2020, 3, 19),11,1],
		[new Date(2020, 3, 20),14,1],
		[new Date(2020, 3, 21),24,2],
		[new Date(2020, 3, 22),27,2], ];
	return JSON.stringify(array);
};
const admin = require('firebase-admin');
const path = require('path');
const serviceAccount = require(path.join(__dirname, "../ServiceAccount.json"));

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;

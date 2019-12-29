/** @format */

const firebase = require('firebase/app');
require('firebase/database');

const firebaseConfig = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	databaseURL: process.env.databaseURL,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
	appId: process.env.appId
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

module.exports = database;

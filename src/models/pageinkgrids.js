/** @format */

const database = require('@models/firebase.js');

const Inkgrid = {
	async setlids(data) {
		return await database.ref('Inkgrid/lids').push(data);
	}
};

module.exports = Inkgrid;

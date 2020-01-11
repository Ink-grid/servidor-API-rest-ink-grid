/** @format */

const database = require('@models/firebase.js');

const clients = {
	async getAll() {
		return await database.ref('NevadoStore/clients').once('value');
	},

	async addClients(data) {
		return await database.ref('NevadoStore/clients').push(data);
	}
};

module.exports = clients;

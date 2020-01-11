/** @format */

const database = require('@models/firebase.js');

const kardex = {
	async upDateKardesbyID(id, data) {
		return await database.ref(`NevadoStore/kardex/${id}`).update(data);
	},

	async getKardexID(data) {
		return await database
			.ref('NevadoStore/kardex')
			.orderByChild('cod_producto')
			.equalTo(data)
			.once('value');
	}
	// async addKardex(data) {
	// return await database.ref('NevadoStore/kardex').push(data);
	// }
};

module.exports = kardex;

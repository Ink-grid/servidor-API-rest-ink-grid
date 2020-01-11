/** @format */

const database = require('@models/firebase.js');

const Productos = {
	async getAll() {
		return await database
			.ref('NevadoStore/Producto')
			.orderByChild('registro')
			.equalTo(false)
			.once('value');
	},
	async addProductos(data) {
		return await database.ref('NevadoStore/Producto').push(data);
	},
	async addKardex(data) {
		return await database.ref('NevadoStore/kardex').push(data);
	}
};

module.exports = Productos;

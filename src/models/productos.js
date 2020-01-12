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
	async getProductbyId(cod, cant) {
		return await database
			.ref(`NevadoStore/kardex/${cod}`)
			.orderByChild('operacion')
			.equalTo('product_list')
			.limitToLast(cant)
			.once('value');
	},
	async getListEntradas(cod) {
		return await database
			.ref(`NevadoStore/kardex/${cod}`)
			.orderByChild('operacion')
			.equalTo('entrada')
			.once('value');
	}
};

module.exports = Productos;

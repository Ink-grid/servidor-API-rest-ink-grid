/** @format */
const database = require('@models/firebase.js');

const Productos = {
	async getAll() {
		return await database.ref('NevadoStore/Producto').once('value');
	},

	async getProductoByCodigo(cod) {
		return await database
			.ref('NevadoStore/Producto')
			.orderByChild('cod_producto')
			.equalTo(cod)
			.once('value');
	},

	async updateProducto(key, data) {
		return await database.ref(`NevadoStore/Producto/${key}`).update(data);
	},

	async removeProducto(key) {
		return await database.ref(`NevadoStore/Producto/${key}`).remove();
	},

	async getProductoEntra() {
		return await database
			.ref('NevadoStore/Producto')
			.orderByChild('registro')
			.equalTo(true)
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
	},
	async getHistorial(cod) {
		return await database.ref(`NevadoStore/kardex/${cod}`).once('value');
	}
};

module.exports = Productos;

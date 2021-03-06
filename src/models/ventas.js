/** @format */

const database = require('@models/firebase.js');

const ventas = {
	async addVentas(id, data) {
		return await database.ref(`NevadoStore/kardex/${id}`).push(data);
	},
	async getproductbyID(codigo) {
		return await database
			.ref('NevadoStore/Producto')
			.orderByChild('cod_producto')
			.equalTo(codigo)
			.once('value');
	},
	async updateProducto(id, data) {
		return await database.ref(`NevadoStore/Producto/${id}`).update(data);
	},
	async getHistoriKardex(id) {
		return await database
			.ref(`NevadoStore/kardex/${id}`)
			.orderByChild('operacion')
			.equalTo('entrada')
			.once('value');
	},

	async getListProduct(id, cant) {
		return await database
			.ref(`NevadoStore/kardex/${id}`)
			.orderByChild('operacion')
			.equalTo('product_list')
			.limitToLast(cant)
			.once('value');
	}
};

module.exports = ventas;

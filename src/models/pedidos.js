/** @format */
const database = require('@models/firebase.js');

const Pedidos = {
	async getPedido() {
		return await database.ref('NevadoStore/Pedidos').once('value');
	},

	async setPedidos(data) {
		return await database.ref('NevadoStore/Pedidos').push(data);
	}
};

module.exports = Pedidos;

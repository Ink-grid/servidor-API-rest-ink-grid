/** @format */

const pedidoModel = require('@models/pedidos.js');

const has = require('has-keys');

module.exports = {
	async addPedidos(req, res) {
		if (!has(req.body, ['productos', 'total', 'cod_tienda'])) {
			res.json({
				status: false,
				message: 'You must specify datos'
			});
			return;
		}

		let { productos, total, cod_tienda } = req.body;
		const data = {
			productos: productos,
			total: parseInt(total),
			cod_tienda: cod_tienda
		};
		await pedidoModel.setPedidos(data);
		res.json({ status: true, message: 'se ingreso con exito el pedido' });
	},

	async getPedidos(req, res) {
		const resulPedidos = await pedidoModel.getPedido();
		if (resulPedidos.val()) {
			let parsPedidos = Object.values(resulPedidos.val());
			res.json({
				status: true,
				message: 'se obtuvo con exito los pedidos',
				data: parsPedidos
			});
		} else {
			res.json({
				status: false,
				message: 'No hay ningun pedido por confirmar'
			});
		}
	}
};

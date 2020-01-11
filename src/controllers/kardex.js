/** @format */

const status = require('http-status');
const kardexModel = require('@models/kardexs.js');

const has = require('has-keys');

module.exports = {
	async addSalidas(req, res) {
		if (!has(req.body, ['cod_producto', 'cantida'])) {
			res.json({
				status: false,
				message: 'You must specify datos'
			});
			return;
		}
		let { cod_producto, cantida } = req.body;

		let kardexKey = await kardexModel.getKardexID(cod_producto);
		if (kardexKey.val() !== null) {
			let id = Object.keys(kardexKey.val());
			let salida = cantida;
			let datakardex = Object.values(kardexKey.val());
			let diferencaiStock = datakardex[0].stock_actual - parseInt(cantida);
			if (datakardex[0].stock_actual === 0) {
				res.json({ status: false, message: 'stock agotado' });
				return;
			}

			if (Math.sign(diferencaiStock) === -1) {
				res.json({
					status: false,
					message: 'no hay suficientes articulos en el stock'
				});
				return;
			}

			const data = {
				salidas: parseInt(datakardex[0].salidas + parseInt(salida)),
				stock_actual: parseInt(datakardex[0].stock_actual - parseInt(salida))
			};
			await kardexModel.upDateKardesbyID(id[0], data);
			res.json({
				status: true,
				message: id[0]
			});
		} else {
			res.json({ status: false, message: 'no kardex list id' });
		}
		// if (dataProcuto.val() !== null) {
		// 	const parseDataProduct = Object.keys(dataProcuto.val() || {}).map(
		// 		key => dataProcuto.val()[key]
		// 	);
		// 	res.json({
		// 		status: true,
		// 		message: 'Returning producto',
		// 		data: parseDataProduct
		// 	});
		// 	return;
		// }

		// res.json({ status: false, message: 'no product list' });
	}
};

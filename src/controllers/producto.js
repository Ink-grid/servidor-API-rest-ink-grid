/** @format */

const status = require('http-status');
const productoModel = require('@models/productos.js');

const has = require('has-keys');

module.exports = {
	async getProducto(req, res) {
		let dataProcuto = await productoModel.getAll();
		if (dataProcuto.val() !== null) {
			const parseDataProduct = Object.keys(dataProcuto.val() || {}).map(
				key => dataProcuto.val()[key]
			);
			res.json({
				status: true,
				message: 'Returning producto',
				data: parseDataProduct
			});
			return;
		}

		res.json({ status: false, message: 'no product list' });
	},

	async addProducto(req, res) {
		if (
			!has(req.body, [
				'cod_producto',
				'marca',
				'categoria',
				'modelo',
				'color',
				'planta',
				'talla',
				'procedencia',
				'fabricante',
				'RUC_proveedor',
				'min',
				'max',
				'lote',
				'tipo_producto'
			])
		) {
			res.json({
				status: false,
				message: 'You must specify datos'
			});
			return;
		}
		// throw {
		// 	code: status.BAD_REQUEST,
		// 	message: 'You must specify the name and email'
		// };
		let {
			cod_producto,
			marca,
			categoria,
			modelo,
			color,
			planta,
			talla,
			procedencia,
			fabricante,
			RUC_proveedor,
			min,
			max,
			lote: lote,
			tipo_producto
		} = req.body;

		const data = {
			cod_producto: cod_producto,
			categoria: categoria,
			marca: marca,
			modelo: modelo,
			color: color,
			planta: planta,
			talla: talla,
			procedencia: procedencia,
			fabricante: fabricante,
			RUC_proveedor: RUC_proveedor,
			min: min,
			max: max,
			lote: lote,
			registro: false,
			tipo_producto: tipo_producto
		};

		await productoModel.addProductos(data);
		res.json({ status: true, message: 'Product Added' });
	}
};

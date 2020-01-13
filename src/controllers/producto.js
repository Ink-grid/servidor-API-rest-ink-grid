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
			stock: 0,
			precio_uni: 0,
			registro: false,
			tipo_producto: tipo_producto
		};

		await productoModel.addProductos(data);
		res.json({ status: true, message: 'Product Added' });
	},

	async getStatusProduct(req, res) {
		if (!has(req.params, 'cod_produc')) {
			res.json({ status: false, message: 'You must specify the cod_product' });
			return;
		}

		let { cod_produc } = req.params;

		let listEntradas = await productoModel.getListEntradas(cod_produc);
		if (listEntradas.val() !== null) {
			let cantList = Object.values(listEntradas.val());
			let statusProduct = await productoModel.getProductbyId(
				cod_produc,
				cantList.length
			);
			if (statusProduct.val() !== null) {
				let arraystatuslist = Object.values(statusProduct.val());
				let cantidad = 0;
				arraystatuslist.map(Element => {
					cantidad += Element.saldo.cantidad;
				});
				res.json({
					status: true,
					message: 'se obtuvo con exito el estado',
					cantidad: cantidad
				});
			}
		} else {
			res.json({
				status: true,
				message: 'no hay registro de compra',
				cantidad: 0
			});
		}
	},

	async getProductoHistorial(req, res) {
		if (!has(req.params, 'cod_produc')) {
			res.json({ status: false, message: 'You must specify the cod_product' });
			return;
		}

		let { cod_produc } = req.params;

		let ListProductHistorial = await productoModel.getHistorial(cod_produc);
		if (ListProductHistorial.val() !== null) {
			let parseintHistorial = Object.values(ListProductHistorial.val());
			res.json({
				status: true,
				message: 'Product list',
				data: parseintHistorial
			});
		} else {
			res.json({ status: false, message: 'No product list' });
		}
	},

	async getProductEntradas(req, res) {
		let dataProduct = await productoModel.getProductoEntra();
		if (dataProduct.val() !== null) {
			const parseDataProducto = Object.values(dataProduct.val());
			res.json({
				status: true,
				message: 'product list',
				data: parseDataProducto
			});
		}
	}
};

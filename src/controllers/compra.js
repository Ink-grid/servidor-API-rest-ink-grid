/** @format */

const status = require('http-status');
const compraModel = require('@models/compras.js');

const has = require('has-keys');

module.exports = {
	async addCompras(req, res) {
		if (
			!has(req.body, [
				'cod_producto',
				'fecha',
				'descripcion',
				'valor_uni',
				'cantidad'
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
		let { cod_producto, fecha, descripcion, valor_uni, cantidad } = req.body;
		const data = {
			fecha: fecha,
			descripcion: descripcion,
			valor_uni: parseInt(valor_uni),
			entradas: {
				cantidad: parseInt(cantidad),
				valor: valor_uni * cantidad
			},
			operacion: 'entrada',
			saldo: {
				cantidad: parseInt(cantidad),
				valor: valor_uni * cantidad
			}
		};

		await compraModel.addCompras(cod_producto, data);

		const ActualizarEntra = await compraModel.getHistoriKardex(cod_producto);
		if (ActualizarEntra.val() !== null) {
			let dat = Object.values(ActualizarEntra.val());
			dat.forEach(async (Element, index) => {
				let listProduct = {
					descripcion: `(producto N° ${index} (${Element.descripcion}))`,
					valor_uni: Element.valor_uni,
					saldo: {
						cantidad: Element.saldo.cantidad,
						valor: Element.saldo.valor
					},
					operacion: 'product_list'
				};
				await compraModel.addCompras(cod_producto, listProduct);
			});
		}

		// res.json({ data: dat });
		// codigo para actualizar cualquier estado de la base de datos
		// const resp = await compraModel.getproductbyID(cod_producto);
		// if (resp.val() !== null) {
		// 	let id = Object.keys(resp.val());
		// 	const data = {
		// 		registro: false
		// 	};
		// 	id.forEach(async eleme => {
		// 		await compraModel.updateProducto(eleme, data);
		// 	});
		// }
		res.json({ status: true, message: 'Compras Added' });
	}
};

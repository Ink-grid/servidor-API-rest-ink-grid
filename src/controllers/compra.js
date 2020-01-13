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

		const ActualizarEntra = await compraModel.getHistoriKardex(cod_producto);

		await compraModel.addCompras(cod_producto, data);

		if (ActualizarEntra.val() !== null) {
			const arrayEntrada = Object.values(ActualizarEntra.val());
			const newListProduct = await compraModel.getListProduct(
				cod_producto,
				arrayEntrada.length
			);
			const arraynewList = Object.values(newListProduct.val());
			const newdatelisproducto = await compraModel.getHistoriKardex(
				cod_producto
			);
			const arraylisproducto = Object.values(newdatelisproducto.val());
			arraynewList.push(arraylisproducto[arraylisproducto.length - 1]);
			arraynewList.forEach(async (Element, index) => {
				if (index + 1 === arraynewList.length) {
					const newdat = {
						descripcion: `(producto N° ${index} (${Element.descripcion}))`,
						operacion: 'product_list',
						saldo: {
							cantidad: Element.saldo.cantidad,
							valor: Element.saldo.valor
						},
						valor_uni: Element.valor_uni
					};
					await compraModel.addCompras(cod_producto, newdat);
				} else {
					await compraModel.addCompras(cod_producto, Element);
				}
			});

			const listProductoKardex = await compraModel.getHistoriKardex(
				cod_producto
			);
			if (listProductoKardex.val() !== null) {
				let cantList = Object.values(listProductoKardex.val());
				const resultList = await compraModel.getListProduct(
					cod_producto,
					cantList.length
				);
				if (resultList.val() !== null) {
					const listArray = Object.values(resultList.val());
					let stock = 0;
					listArray.map(Element => {
						stock += Element.saldo.cantidad;
					});
					const idproducto = await compraModel.getproductbyID(cod_producto);
					if (idproducto.val() !== null) {
						const key = Object.keys(idproducto.val());
						const dataUpdate = {
							stock: stock,
							registro: true,
							precio_uni: parseInt(valor_uni)
						};
						await compraModel.updateProducto(key, dataUpdate);
					}
				}
			}
			res.json({
				status: true,
				message: 'Compras Added'
			});
			return;
		}

		const datanew = {
			descripcion: `producto N° 0 ${descripcion}`,
			valor_uni: parseInt(valor_uni),
			operacion: 'product_list',
			saldo: {
				cantidad: parseInt(cantidad),
				valor: valor_uni * cantidad
			}
		};

		await compraModel.addCompras(cod_producto, datanew);
		res.json({
			status: true,
			message: 'Compras Added'
		});
	}
};

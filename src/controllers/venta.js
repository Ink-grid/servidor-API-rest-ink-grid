/** @format */

const status = require('http-status');
const ventaModel = require('@models/ventas.js');

const has = require('has-keys');

module.exports = {
	async addVenta(req, res) {
		if (!has(req.body, ['cod_producto', 'fecha', 'descripcion', 'cantidad'])) {
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
		let { cod_producto, fecha, descripcion, cantidad } = req.body;

		function extraerTexto(str) {
			let posicion = str.indexOf('(');
			let nuevotexto = str.substring(posicion);
			return nuevotexto;
		}
		const getPorductEnter = await ventaModel.getHistoriKardex(cod_producto);

		if (getPorductEnter.val() !== null) {
			const listEntradas = Object.values(getPorductEnter.val());
			const listProduct = await ventaModel.getListProduct(
				cod_producto,
				listEntradas.length
			);
			if (listProduct.val() !== null) {
				let ListNewProduct = [];
				let lisProduct = Object.values(listProduct.val());
				let sumaTotalPorducto = 0;
				lisProduct.forEach(element => {
					sumaTotalPorducto += element.saldo.cantidad;
				});

				if (sumaTotalPorducto < cantidad) {
					res.json({
						status: false,
						message: 'stock insuficiente, realice una nueva compra'
					});
					return;
				}

				let newcantidad = cantidad;

				// refinando
				for (let element of lisProduct) {
					if (element.saldo.cantidad === 0) {
						ListNewProduct.push(element);
					} else {
						if (
							element.saldo.cantidad >= newcantidad &&
							element.saldo.cantidad !== 0
						) {
							const data = {
								fecha: fecha,
								descripcion: `${descripcion} (${element.descripcion})`,
								valor_uni: element.valor_uni,
								salidas: {
									cantidad: parseInt(newcantidad),
									valor: element.valor_uni * parseInt(newcantidad)
								},
								operacion: 'salida',
								saldo: {
									cantidad: element.saldo.cantidad - parseInt(newcantidad),
									valor:
										element.valor_uni *
										(element.saldo.cantidad - parseInt(newcantidad))
								}
							};
							ListNewProduct.push(data);
							lisProduct.forEach((element, index) => {
								if (index + 1 > ListNewProduct.length) {
									ListNewProduct.push(element);
								}
							});

							await ventaModel.addVentas(cod_producto, data);
							res.json({
								status: true,
								message: 'Venta add'
							});
							break;
						} else {
							let diferencia = element.saldo.cantidad - parseInt(newcantidad);
							var convertPosit = Math.abs(diferencia);
							let newnumberCantidad = parseInt(newcantidad) - convertPosit;
							const datas = {
								fecha: fecha,
								descripcion: `${descripcion} (${element.descripcion})`,
								valor_uni: element.valor_uni,
								salidas: {
									cantidad: parseInt(newnumberCantidad),
									valor: element.valor_uni * parseInt(newnumberCantidad)
								},
								operacion: 'salida',
								saldo: {
									cantidad:
										element.saldo.cantidad - parseInt(newnumberCantidad),
									valor:
										element.valor_uni *
										(element.saldo.cantidad - parseInt(newnumberCantidad))
								}
							};
							ListNewProduct.push(datas);
							await ventaModel.addVentas(cod_producto, datas);
							newcantidad = convertPosit;
							// res.json({ diferencia: newnumberCantidad });
						}
					}
				}

				ListNewProduct.forEach(async element => {
					const dataListProduc = {
						descripcion: extraerTexto(element.descripcion),
						operacion: 'product_list',
						saldo: {
							cantidad: element.saldo.cantidad,
							valor: element.saldo.valor
						},
						valor_uni: element.valor_uni
					};
					await ventaModel.addVentas(cod_producto, dataListProduc);
				});
			}
		}
		// const responsed = await ventaModel.getListProduct(cod_producto);
		// if (responsed.val() !== null) {
		// 	let ListNewProduct = [];
		// 	let lisProduct = Object.values(responsed.val());
		// 	let sumaTotalPorducto = 0;
		// 	lisProduct.forEach(element => {
		// 		sumaTotalPorducto += element.saldo.cantidad;
		// 	});

		// 	if (sumaTotalPorducto < cantidad) {
		// 		res.json({
		// 			status: false,
		// 			message: 'stock insuficiente, realice una nueva compra'
		// 		});
		// 		return;
		// 	}

		// 	let newcantidad = cantidad;

		// 	// refinando
		// 	for (let element of lisProduct) {
		// 		if (
		// 			element.saldo.cantidad >= newcantidad &&
		// 			element.saldo.cantidad !== 0
		// 		) {
		// 			const data = {
		// 				fecha: fecha,
		// 				descripcion: `${descripcion} (${element.descripcion})`,
		// 				valor_uni: element.valor_uni,
		// 				salidas: {
		// 					cantidad: parseInt(newcantidad),
		// 					valor: element.valor_uni * parseInt(newcantidad)
		// 				},
		// 				operacion: 'salida',
		// 				saldo: {
		// 					cantidad: element.saldo.cantidad - parseInt(newcantidad),
		// 					valor:
		// 						element.valor_uni *
		// 						(element.saldo.cantidad - parseInt(newcantidad))
		// 				}
		// 			};
		// 			ListNewProduct.push(data);
		// 			lisProduct.forEach((element, index) => {
		// 				if (index !== 0) {
		// 					ListNewProduct.push(element);
		// 				}
		// 			});

		// 			await ventaModel.addVentas(cod_producto, data);
		// 			res.json({
		// 				status: true,
		// 				message: 'Venta add'
		// 			});
		// 			break;
		// 		} else {
		// 			let diferencia = element.saldo.cantidad - parseInt(newcantidad);
		// 			var convertPosit = Math.abs(diferencia);
		// 			let newnumberCantidad = parseInt(newcantidad) - convertPosit;
		// 			const datas = {
		// 				fecha: fecha,
		// 				descripcion: `${descripcion} (${element.descripcion})`,
		// 				valor_uni: element.valor_uni,
		// 				salidas: {
		// 					cantidad: parseInt(newnumberCantidad),
		// 					valor: element.valor_uni * parseInt(newnumberCantidad)
		// 				},
		// 				operacion: 'salida',
		// 				saldo: {
		// 					cantidad: element.saldo.cantidad - parseInt(newnumberCantidad),
		// 					valor:
		// 						element.valor_uni *
		// 						(element.saldo.cantidad - parseInt(newnumberCantidad))
		// 				}
		// 			};
		// 			ListNewProduct.push(datas);
		// 			await ventaModel.addVentas(cod_producto, datas);

		// 			// res.json({ diferencia: newnumberCantidad });
		// 		}

		// 		newcantidad = convertPosit;
		// 	}

		// 	ListNewProduct.forEach(async element => {
		// 		const dataListProduc = {
		// 			descripcion: extraerTexto(element.descripcion),
		// 			operacion: 'product_list',
		// 			saldo: {
		// 				cantidad: element.saldo.cantidad,
		// 				valor: element.saldo.valor
		// 			},
		// 			valor_uni: element.valor_uni
		// 		};
		// 		await ventaModel.addVentas(cod_producto, dataListProduc);
		// 	});
		// }
	}
};

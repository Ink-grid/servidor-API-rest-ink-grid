/** @format */
const Inkgrid = require('@models/pageinkgrids.js');

const has = require('has-keys');

module.exports = {
	async setLisd(req, res) {
		if (!has(req.body, ['name', 'email', 'phone', 'message'])) {
			res.json({
				status: false,
				message: 'por favor relleno los campos.'
			});
			return;
		}

		//console.log(req.body);

		try {
			await Inkgrid.setlids(req.body);
			res.json({
				status: true,
				message: 'se envio con exito su mensaje'
			});
		} catch (error) {
			res.json({
				status: false,
				message: 'ocurrio un error en su envio'
			});
		}

		// VERIFICAMOS SI EL PRODUCTO EXISTE
	}
};

/** @format */

const status = require('http-status');
const clientModel = require('@models/clients.js');

const has = require('has-keys');

module.exports = {
	async getClients(req, res) {
		let dataClient = await clientModel.getAll();
		if (dataClient.val() !== null) {
			const parseBLoglist = Object.keys(dataClient.val() || {}).map(
				key => dataClient.val()[key]
			);
			res.json({
				status: true,
				message: 'Returning blogs',
				data: parseBLoglist
			});
			return;
		}

		res.json({ status: false, message: 'no clients list' });
	},

	async addClient(req, res) {
		if (
			!has(req.body, [
				'document',
				'name',
				'email',
				'direccion',
				'celular',
				'registro'
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
		let { document, name, email, direccion, celular, registro } = req.body;
		const data = {
			document: document,
			name: name,
			email: email,
			direccion: direccion,
			celular: celular,
			registro: registro
		};

		await clientModel.addClients(data);

		res.json({ status: true, message: 'User Added' });
	}
};

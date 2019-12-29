/** @format */

const database = require('@models/firebase.js');

const blogs = {
	async getAll() {
		return await database.ref('me/BlogPortada').once('value');
	},

	async searchBlog(url) {
		return await database
			.ref('me/BlogPortada')
			.orderByChild('Titulo')
			.equalTo(url)
			.once('value');
	}
};

module.exports = blogs;

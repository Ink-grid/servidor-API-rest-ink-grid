/** @format */

const status = require('http-status');
const blogsModel = require('@models/blogs.js');

const has = require('has-keys');

module.exports = {
	async getBlogs(req, res) {
		let dataBlogs = await blogsModel.getAll();
		if (dataBlogs.val() !== null) {
			const parseBLoglist = Object.keys(dataBlogs.val() || {}).map(
				key => dataBlogs.val()[key]
			);
			res.json({
				status: true,
				message: 'Returning blogs',
				data: parseBLoglist
			});
			return;
		}

		res.json({ status: false, message: 'no blogs list' });
	},

	async getBlogByUrl(req, res) {
		console.log(req.params);
		if (!has(req.params, 'url'))
			throw { code: status.BAD_REQUEST, message: 'You must specify the url' };

		let { url } = req.params;

		let blog = await blogsModel.searchBlog(url);

		if (blog.val() !== null) {
			res.json({ status: true, message: 'Returning blog', data: blog.val() });
			return;
		}

		res.json({ status: false, message: 'Not found blog' });
	}
};

/** @format */

const express = require('express');
const router = express.Router();

const inkgrid = require('@controllers/pageinkgrid.js');

router.post('/api/contacto', inkgrid.setLisd);
// router.post('/api/products', producto.addProducto);
// router.get('/api/blogs', blog.getBlogs);

module.exports = router;

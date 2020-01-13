/** @format */

const express = require('express');
const router = express.Router();

const producto = require('@controllers/producto.js');

router.get('/api/products', producto.getProducto);
router.get('/api/products/:cod_produc', producto.getStatusProduct);
router.post('/api/products', producto.addProducto);
// router.get('/api/blogs', blog.getBlogs);

module.exports = router;

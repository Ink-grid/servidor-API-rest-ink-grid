/** @format */

const express = require('express');
const router = express.Router();

const kardex = require('@controllers/kardex.js');

router.post('/api/kardex', kardex.addSalidas);
// router.post('/api/products', producto.addProducto);
// router.get('/api/blogs', blog.getBlogs);

module.exports = router;

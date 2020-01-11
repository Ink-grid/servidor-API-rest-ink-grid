/** @format */

const express = require('express');
const router = express.Router();

const venta = require('@controllers/venta.js');

router.post('/api/ventas', venta.addVenta);
// router.get('/api/blogs', blog.getBlogs);

module.exports = router;

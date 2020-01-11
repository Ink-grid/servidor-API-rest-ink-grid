/** @format */

const express = require('express');
const router = express.Router();

const compra = require('@controllers/compra.js');

router.post('/api/compras', compra.addCompras);
// router.get('/api/blogs', blog.getBlogs);

module.exports = router;

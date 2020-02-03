/** @format */

const express = require('express');
const router = express.Router();

const pedido = require('@controllers/pedido.js');

router.get('/api/pedidos', pedido.getPedidos);
router.post('/api/pedidos', pedido.addPedidos);

module.exports = router;

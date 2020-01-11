/** @format */

const express = require('express');
const router = express.Router();

const client = require('@controllers/client.js');

router.get('/api/clients', client.getClients);
router.post('/api/clients', client.addClient);
// router.get('/api/blogs', blog.getBlogs);

module.exports = router;

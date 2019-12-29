/** @format */

const express = require('express');
const router = express.Router();

const blog = require('@controllers/blog.js');

router.get('/api/blogs/:url', blog.getBlogByUrl);
router.get('/api/blogs', blog.getBlogs);

module.exports = router;

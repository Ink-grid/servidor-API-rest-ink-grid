/** @format */

const router = require('express').Router();

// Users routes
router.use(require('@routes/blog'));
router.use(require('@routes/user'));

module.exports = router;

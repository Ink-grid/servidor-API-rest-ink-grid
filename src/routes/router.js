/** @format */

const router = require('express').Router();

// Users routes
router.use(require('@routes/blog'));
router.use(require('@routes/client'));
router.use(require('@routes/producto'));
router.use(require('@routes/kardex'));
router.use(require('@routes/compra'));
router.use(require('@routes/venta'));
router.use(require('@routes/user'));

module.exports = router;

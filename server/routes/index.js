const express = require('express');

const router = express.Router();

router.use('/api/auth', require('./auth'));
// router.use('/api/host-place', require('./hostplaces'));
router.use('/api/musician', require('./musician'));

module.exports = router;

const express = require('express');

const router = express.Router();

router.use('/api/auth', require('./auth'));
// router.use('/api//new-place', require('./hostplaces'))

module.exports = router;

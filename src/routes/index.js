const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth')
const router = express.Router()

// check apiKey
// router.use(apiKey)
// check permisstion
// router.use(permission('0000'))

router.get('/get-cookie', (req, res) => {
    const cookies = req.cookies;
    res.json({ cookies });
});

router.use('/v1/api/access', require('./access/index'))
router.use('/v1/api/product', require('./product/index'))

module.exports = router;



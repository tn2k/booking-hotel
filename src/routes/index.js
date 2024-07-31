const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth')
const router = express.Router()

// check apiKey
// router.use(apiKey)
// check permisstion
// router.use(permission('0000'))

router.use('/v1/api', require('./access/user.route'))
router.use('/v1/api', require('./access/booking.route'))
router.use('/v1/api', require('./product/index'))


module.exports = router;



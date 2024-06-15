const express = require('express');
const routes = express.Router()

routes.use('/v1/api', require('./user.route'))
routes.use('/v1/api', require('./booking.route'))


module.exports = routes;



const express = require('express');
const routes = express.Router()



routes.use('/v1', require('./v1/user.route'))
routes.use('/v1', require('./v1/booking.route'))
routes.use('/v1', require('./v1/booking.route'))


module.exports = routes;



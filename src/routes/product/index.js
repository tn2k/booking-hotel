const express = require('express')
const routes = express.Router()

const { createProduct } = require('../../controllers/product.controller')
const { authentication, } = require('../../auth/jwt_service')
const { asyncHandler } = require("../../helpers/asyncHandler")


// authentication
routes.use(authentication)
//////////////////
routes.post('/product', asyncHandler(createProduct))

module.exports = routes; 
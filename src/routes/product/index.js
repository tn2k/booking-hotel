const express = require('express')
const routes = express.Router()
const upload = require("../../config/uploadImage")
const { createProduct, getAllDraftForUser, getAllPublishForUser, publishProductByUser, unPublishProductByUser, getListSearchProduct, findAllProducts, findProducts, updateProduct } = require('../../controllers/product.controller')
const { authenticationV1 } = require('../../auth/jwt_service')
const { asyncHandler } = require("../../helpers/asyncHandler")
const { findAllProducts2 } = require('../../services/product.service')

routes.post('/search/:keySearch', asyncHandler(getListSearchProduct))
routes.get('/:product_id', asyncHandler(findProducts))
routes.get('', asyncHandler(findAllProducts))
routes.get('/productRadoom', asyncHandler(findAllProducts2))

// authentication
routes.use(authenticationV1)
//////////////////

routes.post('', upload.array('product_image', 5), asyncHandler(createProduct))
routes.patch('/:productId', upload.array('product_image', 5), asyncHandler(updateProduct))

routes.post('/publish/:id', asyncHandler(publishProductByUser))
routes.post('/unpublish/:id', asyncHandler(unPublishProductByUser))

// QUERY // 
routes.get('/drafts/all', asyncHandler(getAllDraftForUser))
routes.get('/published/all', asyncHandler(getAllPublishForUser))

module.exports = routes;
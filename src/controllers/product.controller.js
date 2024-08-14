
const { OK, CREATED, SuccessResponse } = require("../core/success.response")
const ProductService = require("../services/product.service")


const createProduct = async (req, res, next) => {
    new SuccessResponse({
        message: "Create new Product success!",
        metadata: await ProductService.createProduct(req.body.product_type, {
            ...req.body,
            product_user: req.user.userId
        })
    }).send(res)
};
// QUERY //
const getAllDraftForUser = async (req, res, next) => {
    new SuccessResponse({
        message: "Get list Draft success!",
        metadata: await ProductService.findAllDraftsForUser({
            product_user: req.user.userId
        })
    }).send(res)
}

const getAllPublishForUser = async (req, res, next) => {
    new SuccessResponse({
        message: "Get list Publish success!",
        metadata: await ProductService.findAllPublishForShop({
            product_user: req.user.userId
        })
    }).send(res)
}

const updateProduct = async (req, res, next) => {
    new SuccessResponse({
        message: "Update Product success!",
        metadata: await ProductService.updateProduct(req.body.product_type, req.params.productId, {
            ...req.body,
            product_user: req.user.userId
        })
    }).send(res)
}

const publishProductByUser = async (req, res, next) => {
    new SuccessResponse({
        message: "publish Product By User success!",
        metadata: await ProductService.publishProductByUser({
            product_user: req.user.userId,
            product_id: req.params.id
        })
    }).send(res)
}

const unPublishProductByUser = async (req, res, next) => {
    new SuccessResponse({
        message: "Unpublish Product By User success!",
        metadata: await ProductService.unPublishProductByUser({
            product_user: req.user.userId,
            product_id: req.params.id
        })
    }).send(res)
}
// END QUERY //

const getListSearchProduct = async (req, res, next) => {
    new SuccessResponse({
        message: "Get list getListSearch success!",
        metadata: await ProductService.searchProducts(req.params)
    }).send(res)
}

const findAllProducts = async (req, res, next) => {
    new SuccessResponse({
        message: "Get list findAllProducts success!",
        metadata: await ProductService.findAllProducts(req.params)
    }).send(res)
}

const findProducts = async (req, res, next) => {
    new SuccessResponse({
        message: "Get list findProducts success!",
        metadata: await ProductService.findProduct({
            product_id: req.params.product_id
        })
    }).send(res)
}



module.exports = {
    createProduct,
    getAllDraftForUser,
    getAllPublishForUser,
    unPublishProductByUser,
    publishProductByUser,
    getListSearchProduct,
    findAllProducts,
    findProducts,
    updateProduct
};

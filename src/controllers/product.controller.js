
const { OK, CREATED, SuccessResponse } = require("../core/success.response")
const ProductService = require("../services/product.service")


const createProduct = async (req, res, next) => {
    new SuccessResponse({
        message: "Get token User success!",
        metadata: await ProductService.createProduct(req.body.product_type, {
            ...req.body,
            product_user: req.user.userId
        })
    }).send(res)
};



module.exports = {
    createProduct
};

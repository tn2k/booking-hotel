'use strict'


const db = require('../index');
const Users = require('../user.model')
const { getSelectData } = require('../../utils/index')

const findAllDraftsForUser = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip })
}

const findAllPublishForShop = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip })
}

const searchProductByUser = async ({ keySearch }) => {
    const regexSearch = new RegExp(keySearch)
    const results = await db.Products.find({
        isPublished: true,
        $text: { $search: regexSearch },
    }, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: " textScore" } })
    return results
}

const publishProductByUser = async ({ product_user, product_id }) => {
    const foundUser = await db.Products.findOne({
        product_user: new Types.Object(product_user),
        _id: new Types.Object(product_id)
    })
    if (!foundUser) return null

    foundUser.isDraft = false
    foundUser.isPublished = true

    const { modifiedCount } = await foundUser.update(foundUser)

    return modifiedCount
}

const unPublishProductByUser = async ({ product_user, product_id }) => {
    const foundUser = await db.Products.findOne({
        product_user: new Types.Object(product_user),
        _id: new Types.Object(product_id)
    })
    if (!foundUser) return null

    foundUser.isDraft = true
    foundUser.isPublished = false

    const { modifiedCount } = await foundUser.update(foundUser)

    return modifiedCount
}

const findAllProducts = async ({ limit, sort, page, filter, select }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const products = await db.Products.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
    return products
}

const findProduct = async ({ product_id }) => {
    return await db.product.findById(product_id)
}

const updateProductById = async ({
    productId,
    bodyUpdate,
    model,
    isNew = true
}) => {
    return await model.findByIdAndUpdate(productId, bodyUpdate, {
        new: isNew
    })
}

const queryProduct = async ({ query, limit, skip }) => {
    return await db.Products.findAll({
        where: query,
        include: [{
            model: Users,
            attributes: ['name', 'email'],
        }],
        order: [['updatedAt', 'DESC']],
        offset: skip,
        limit: limit,
        raw: true,
    });
}


module.exports = {
    findAllDraftsForUser,
    publishProductByUser,
    findAllPublishForShop,
    unPublishProductByUser,
    searchProductByUser,
    findAllProducts,
    findProduct
}
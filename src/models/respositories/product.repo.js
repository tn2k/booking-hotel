'use strict'

const Sequelize = require("sequelize")
const db = require('../index');
const Users = require('../user.model')
const { getSelectData } = require('../../utils/index');
const { where } = require('sequelize');

const findAllDraftsForUser = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip })
}

const findAllPublishForShop = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip })
}

const searchProductByUser = async ({ keySearch }) => {
    const results = await db.Products.findAll({
        where: {
            product_slug: {
                [Sequelize.Op.like]: `%${keySearch}%`
            }
        },
        attributes: {
            include: [
                [Sequelize.literal(`MATCH (product_slug) AGAINST (:search IN NATURAL LANGUAGE MODE)`), 'score']
            ]
        },
        order: [
            [Sequelize.literal(`score`), 'DESC']
        ],
        replacements: { search: keySearch }
    });
    return results;
};
const publishProductByUser = async ({ product_user, product_id }) => {
    try {
        const foundUser = await db.Products.findOne({
            product_user: product_user,
            product_id: product_id,
        })
        console.log("foundUser", foundUser)
        if (!foundUser) return null
        const updatedProduct = await db.Products.update(
            { isDraft: false, isPublished: true },
            { where: { product_user: product_user, product_id: product_id } }
        );
        console.log("updatedProduct", updatedProduct)
        if (updatedProduct === 0) return null
        const Product = await db.Products.findByPk(product_id);
        return Product
    } catch (error) {

    }
}

const unPublishProductByUser = async ({ product_user, product_id }) => {
    const foundUser = await db.Products.findOne({
        product_user: product_user,
        product_id: product_id,
    })
    if (!foundUser) return null

    const updatedProduct = await db.Products.update(
        { isDraft: true, isPublished: false },
        { where: { product_user: product_user, product_id: product_id } }
    );
    if (updatedProduct === 0) return null
    const Product = await db.Products.findByPk(product_id);
    return Product
}


const findAllProducts = async ({ limit, sort, page, filter, select }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const products = await db.Products.findAll(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
    return products
}

const findProduct = async (product_id) => {
    return await db.Products.findOne({
        where: { product_id },
        raw: true
    })
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
    try {
        return await db.Products.findAll({
            where: query,
            include: [
                {
                    model: db.Users,
                    as: 'users',
                    attributes: ['tenant_id', 'name', 'email'],
                }
            ],
            order: [['updatedAt', 'DESC']],
            offset: skip,
            limit: limit,
        });
    } catch (error) {
        throw error
    }
}


module.exports = {
    findAllDraftsForUser,
    publishProductByUser,
    findAllPublishForShop,
    unPublishProductByUser,
    searchProductByUser,
    findAllProducts,
    findProduct,
    updateProductById
}
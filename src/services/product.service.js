" use strict"

const db = require('../models/index')
const { BadRequestError } = require("../core/error.response")
const { where, Model } = require('sequelize')
const { findAllDraftsForUser, publishProductByUser, findAllPublishForShop, unPublishProductByUser, searchProductByUser, findAllProducts, findProduct } = require("../models/respositories/product.repo")
const { object } = require('joi')

class ProductFactory {
    static async createProduct(type, payload) {
        switch (type) {
            case "Room":
                return new Room(payload).createProduct()
            case "House":
                return new House(payload).createProduct()
            default:
                throw new BadRequestError(`Invalid Product Type ${type}`)
        }
    }

    static async updateProduct(type, productId, payload) {
        const productClass = ProductFactory.productRegistry[type]
        if (!productClass) throw new BadRequestError(`Invalid Product Type ${type}`)
        return new productClass(payload).updateProduct(productId)
    }
    // PUT //
    static async publishProductByUser({ product_user, product_id }) {
        return await publishProductByUser({ product_user, product_id })
    }

    static async unPublishProductByUser({ product_user, product_id }) {
        return await unPublishProductByUser({ product_user, product_id })
    }
    // END PUT // 

    static async findAllDraftsForUser({ product_user, limit = 50, skip = 0 }) {
        const query = { product_user, isDraft: true }
        return await findAllDraftsForUser({ query, limit, skip })
    }

    static async findAllPublishForShop({ product_user, limit = 50, skip = 0 }) {
        const query = { product_user, isPublished: true }
        return await findAllPublishForShop({ query, limit, skip })
    }

    static async searchProducts({ keySearch }) {
        return await searchProductByUser({ keySearch })
    }

    static async findAllProducts({ limit = 50, sort = ' ctime', page = 1, filter = { isPublished: true } }) {
        return await findAllProducts({
            limit, sort, filter, page,
            select: ['product_name', 'product_price', 'product_thumb']
        })
    }

    static async findProduct({ product_id }) {
        return await findProduct({ product_id })
    }
}

class Product {
    constructor({
        product_name, product_thumb, product_price, product_quantity,
        product_type, product_size, product_address, product_attributes, product_user
    }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_size = product_size
        this.product_address = product_address
        this.product_user = product_user
        this.product_attributes = product_attributes
    }

    // create new product
    async createProduct(id) {
        const productData = {
            ...this,
            product_id: id
        };
        return await db.Products.create(productData)
    }

    // Update product
    async updateProduct(productId, bodyUpdate) {
        return await productId.findByIdAndUpdate({ productId, bodyUpdate, model: Products })
    }
}

class Room extends Product {
    async createProduct() {
        const newRoom = await db.Rooms.create({
            ...this.product_attributes,
            product_user: this.product_user
        })
        if (!newRoom) throw new BadRequestError("create new Room error")
        const newProduct = await super.createProduct(newRoom.room_id)
        if (!newProduct) throw new BadRequestError("create new Product error")
        return newProduct
    }

    async updataProduct(productId) {
        //1. remove attr has null underfined
        console.log("check data this  1", this)
        const objectParams = removeUndefinedObject(this)
        console.log("check data this  2", objectParams)
        //2. check xem update o cho nao ?
        if (objectParams.product_attributes) {
            // update child
            await updateProductById({
                productId,
                bodyUpdate: updateNestObjectParser(objectParams.product_attributes),
                model: Rooms
            })
        }
        const updateProduct = await super.updateProduct(productId, updateNestObjectParser(objectParams))
        return updateProduct

    }

}

class House extends Product {
    async createProduct() {
        const newHouse = await db.Houses.create({
            ...this.product_attributes,
            product_user: this.product_user
        })
        if (!newHouse) throw new BadRequestError("create new House error")
        const newProduct = await super.createProduct(newHouse.house_id)
        if (!newProduct) throw new BadRequestError("create new Product error")
        return newProduct
    }
}

module.exports = ProductFactory
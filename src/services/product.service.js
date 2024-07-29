" use strict"

const db = require('../models/index')
const { BadRequestError } = require("../core/error.response")

class ProductFactory {
    static async createProduct(type, payload) {
        switch (type) {
            case "Room":
                return new Room(payload)
            case "House":
                return new House(payload).createProduct()
            default:
                throw new BadRequestError(`Invalid Product Type ${type}`)
        }

    }
}

class Product {
    constructor({
        product_name, product_thumb, product_price, product_quantity,
        product_type, product_area, product_address, product_attributes, product_user
    }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_area = product_area
        this.product_address = product_address
        this.product_user = product_user
        this.product_attributes = product_attributes
    }

    async createProduct() {
        return await db.Product.create(this)
    }
}

class Room extends Product {
    async createProduct() {
        const newClothing = await db.Room.create(this.product_attributes)
        if (!newClothing) throw new BadRequestError("create new Clothing error")

        const newProduct = await super.createProduct()
        if (!newProduct) throw new BadRequestError("create new Product error")

        return newProduct
    }
}

class House extends Product {
    async createProduct() {
        const newClothing = await db.fullProperty.create(this.product_attributes)
        if (!newClothing) throw new BadRequestError("create new Clothing error")

        const newProduct = await super.createProduct()
        if (!newProduct) throw BadRequestError("create new Product error")

        return newProduct
    }
}

module.exports = ProductFactory
" use strict"

const db = require('../models/index')
const { BadRequestError } = require("../core/error.response")

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
    async createProduct(id) {
        const productData = {
            ...this,
            product_id: id
        };
        return await db.Products.create(productData)
    }
}

class Room extends Product {

    async createProduct() {
        const newRoom = await db.Rooms.create({
            ...this.product_attributes,
            product_user: this.product_user
        })
        if (!newRoom) throw new BadRequestError("create new Clothing error")
        const newProduct = await super.createProduct(newRoom.room_id)
        if (!newProduct) throw new BadRequestError("create new Product error")
        return newProduct
    }
}

class House extends Product {
    async createProduct() {
        const newHouse = await db.Houses.create({
            ...this.product_attributes,
            product_user: this.product_user
        })
        if (!newHouse) throw new BadRequestError("create new Clothing error")

        const newProduct = await super.createProduct(newHouse.house_id)
        if (!newProduct) throw new BadRequestError("create new Product error")

        return newProduct
    }
}

module.exports = ProductFactory
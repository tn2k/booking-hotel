" use strict"

const db = require('../models/index')
const { BadRequestError } = require("../core/error.response")
const { findAllDraftsForUser, publishProductByUser, findAllPublishForShop, unPublishProductByUser, searchProductByUser, findAllProducts, findProduct } = require("../models/respositories/product.repo")
const { removeUndefinedObject, updateNestedObjectParser, transformAmenities } = require("../utils/index")
const cloudinary = require("../config/cloudinary");

class ProductFactory {
    static async createProduct(type, product_image, payload) {
        try {
            if (!product_image.length) return
            const imageData = []
            for (const file of product_image) {
                const result = await cloudinary.v2.uploader.upload(file.path, {
                    asset_folder: 'products',
                    resource_type: 'image',
                    width: 384,
                    height: 250,
                    crop: "scale"
                })
                imageData.push({
                    url: result.secure_url,
                    public_id: result.public_id
                })
            }
            payload.product_image = imageData;
            switch (type) {
                case "Room":
                    return new Room(payload).createProduct()
                case "House":
                    return new House(payload).createProduct()
                default:
                    throw new BadRequestError(`Invalid Product Type ${type}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async updateProduct(type, productId, product_image, payload) {
        if (!product_image.length) return
        const imageData = []
        for (const file of product_image) {
            const result = await cloudinary.v2.uploader.upload(file.path, {
                asset_folder: 'products',
                resource_type: 'image',
                width: 384,
                height: 250,
                crop: "scale"
            })
            imageData.push({
                url: result.secure_url,
                public_id: result.public_id
            })
        }
        payload.product_image = imageData;
        switch (type) {
            case "Room":
                return new Room(payload).updateProduct(productId)
            case "House":
                return new House(payload).updateProduct(productId)
            default:
                throw new BadRequestError(`Invalid Product Type ${type}`)
        }
    }
    // PUT //
    static async publishProductByUser({ product_user, product_id }) {
        return await publishProductByUser({ product_user, product_id })
    }

    static async unPublishProductByUser({ product_user, product_id }) {
        return await unPublishProductByUser({ product_user, product_id })
    }
    // END PUT // 

    static async findAllDraftsForUser({ product_user, limit = 12, skip = 0 }) {
        const query = { product_user, isDraft: true }
        return await findAllDraftsForUser({ query, limit, skip })
    }

    static async findAllPublishForShop({ product_user, limit = 12, skip = 0 }) {
        const query = { product_user, isPublished: true }
        return await findAllPublishForShop({ query, limit, skip })
    }

    static async searchProducts({ keySearch }) {
        return await searchProductByUser({ keySearch })
    }

    static async findAllProducts({ limit = 12, sort = ' ctime', page = 1, filter = { isPublished: true } }) {
        return await findAllProducts({
            limit, sort, filter, page,
            select: ['product_id', 'product_name', 'product_price', 'product_image', 'product_type', 'product_size', 'product_address', 'product_ratingsAverage']
        })
    }

    static async findAllProducts2({ limit = 4, sort = ' ctime', page = 1, filter = { isPublished: true } }) {
        return await findAllProducts({
            limit, sort, filter, page,
            select: ['product_id', 'product_name', 'product_price', 'product_image', 'product_type', 'product_size', 'product_address', 'product_ratingsAverage']
        })
    }

    static async findProduct({ product_id }) {
        return await findProduct(product_id)
    }
}

class Product {
    constructor({
        product_name, product_image, product_price, product_quantity,
        product_type, product_size, product_address, product_attributes, product_user, product_amenities
    }) {
        this.product_name = product_name
        this.product_image = product_image
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_size = product_size
        this.product_address = product_address
        this.product_user = product_user
        this.product_attributes = product_attributes
        this.product_amenities = product_amenities
    }
    // create new product
    async createProduct(id) {
        try {
            const productData = {
                ...this,
                product_id: id
            };
            return await db.Products.create(productData);
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(productId, bodyUpdate) {
        await db.Products.update(bodyUpdate, {
            where: {
                product_id: productId,
            },
        });
        const updatedProduct = await db.Products.findByPk(productId);
        return updatedProduct
    }
}

class Room extends Product {
    async createProduct() {
        const newRoom = await db.Rooms.create({
            ...this.product_attributes,
            product_user: this.product_user
        })
        if (!newRoom) throw new BadRequestError("create new Room error")

        const newImage = await db.ProductImages.create({
            ...this.product_image,
            image_id: newRoom.room_id
        })
        if (!newImage) throw new BadRequestError("create new Image error")

        const dataNewAmenities = transformAmenities({ ...this.product_amenities })
        const newAmenities = await db.Amenities.create({
            ...dataNewAmenities,
            amenity_id: newRoom.room_id
        })
        if (!newAmenities) throw new BadRequestError("create new Amenities error")
        const newProduct = await super.createProduct(newRoom.room_id)
        if (!newProduct) throw new BadRequestError("create new Product error")
        return newProduct
    }

    async updateProduct(productId) {
        //1. remove attr has null underfined
        const objectParams = removeUndefinedObject(this)
        //2. check  update ? 
        if (objectParams.product_attributes) {
            await db.Rooms.update(updateNestedObjectParser(objectParams.product_attributes), {
                where: {
                    room_id: productId,
                },
            });
        }
        const updateProduct = await super.updateProduct(productId, updateNestedObjectParser(objectParams))
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

        const newImage = await db.ProductImages.create({
            ...this.product_image,
            image_id: newHouse.house_id
        })
        if (!newImage) throw new BadRequestError("create new Image error")

        const dataNewAmenities = transformAmenities({ ...this.product_amenities })
        const newAmenities = await db.Amenities.create({
            ...dataNewAmenities,
            amenity_id: newHouse.house_id
        })
        if (!newAmenities) throw new BadRequestError("create new Amenities error")

        const newProduct = await super.createProduct(newHouse.house_id)
        if (!newProduct) throw new BadRequestError("create new Product error")
        return newProduct
    }
}

module.exports = ProductFactory
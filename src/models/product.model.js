'use strict';
const { lowerCase } = require('lodash');
const { DataTypes, Model } = require('sequelize');
const slugify = require('slugify')
module.exports = (sequelize) => {
    class Products extends Model { }

    Products.init({
        product_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        product_user: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_slug: {
            type: DataTypes.STRING,
        },
        product_thumb: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        product_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_type: {
            type: DataTypes.ENUM('Room', 'House'),
            allowNull: false,
        },
        product_size: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        product_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_ratingsAverage: {
            type: DataTypes.FLOAT,
            defaultValue: 4.5,
            validate: {
                min: {
                    args: [1],
                    msg: "Rating must be above 1.0"
                },
                max: {
                    args: [5],
                    msg: "Rating must be below 5.0"
                }
            },
            set(val) {
                this.setDataValue('product_ratingsAverage', Math.round(val * 10) / 10);
            }
        },
        product_variations: {
            type: DataTypes.JSON,
            defaultValue: []
        },
        isDraft: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isPublished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        product_attributes: {
            type: DataTypes.JSON,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Products',
        indexes: [
            {
                fields: ['isDraft']
            },
            {
                fields: ['isPublished']
            },
            {
                type: 'FULLTEXT',
                fields: ['product_name']
            }
        ],
        defaultScope: {
            attributes: {
                exclude: ['isDraft', 'isPublished']
            }
        },
        hooks: {
            beforeSave: (product, options) => {
                product.product_slug = slugify(product.product_name, { lower: true });
            }
        }
    });
    return Products;
};


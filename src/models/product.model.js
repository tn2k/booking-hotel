'use strict';
const { DataTypes, Model } = require('sequelize');

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
        product_attributes: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Products'
    });

    return Products;
};

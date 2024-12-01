'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class ProductImages extends Model { }

    ProductImages.init({
        image_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.UUID,
            references: {
                model: 'Products',
                key: 'product_id'
            }
        },
        url: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ProductImages'
    });

    return ProductImages;
};

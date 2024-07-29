'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class House extends Model { }

    House.init({
        room_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Product',
                key: 'product_id'
            }
        },
        room_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        room_detail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        room_rules: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rentail_conditions: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        terms_and_conditions: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'House'
    });

    return House;
};

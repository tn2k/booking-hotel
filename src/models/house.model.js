'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class House extends Model { }

    House.init({
        house_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        house_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        house_detail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        house_rules: {
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
        modelName: 'Houses'
    });

    return House;
};
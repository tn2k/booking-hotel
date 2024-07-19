'use strict';

const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class apiKeyModels extends Model { }

    apiKeyModels.init({
        key: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        permissions: {
            type: DataTypes.ENUM('0000', '1111', '2222'),
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'apiKeyModels'
    });

    return apiKeyModels;
};

'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class keytokenModels extends Model { }
    keytokenModels.init({
        user: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'tenant_id'
            }
        },
        publicKey: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.JSON,
            defaultValue: []
        }
    }, {
        sequelize,
        modelName: 'keytokenModels'
    });

    return keytokenModels;
};

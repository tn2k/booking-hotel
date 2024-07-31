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
        privatekey: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        publickey: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        refreshTokensUsed: {
            type: DataTypes.JSON,
            defaultValue: []
        },
        refreshToken: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'keytokenModels'
    });

    return keytokenModels;
};

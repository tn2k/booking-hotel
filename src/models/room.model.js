'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Room extends Model { }

    Room.init({
        room_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        product_user: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'tenant_id'
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
        modelName: 'Rooms'
    });

    return Room;
};

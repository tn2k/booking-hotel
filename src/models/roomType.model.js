'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class RoomType extends Model { }

    RoomType.init({
        type_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        type_name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'RoomType'
    });

    return RoomType;
};

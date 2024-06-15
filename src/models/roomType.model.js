'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class RoomType extends Model { }

    RoomType.init({
        type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type_name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'RoomType'
    });

    return RoomType;
};

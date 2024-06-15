'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class RoomLocation extends Model { }

    RoomLocation.init({
        location_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        location_name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'RoomLocation'
    });

    return RoomLocation;
};

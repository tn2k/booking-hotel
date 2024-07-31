'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class RoomLocation extends Model { }

    RoomLocation.init({
        location_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        location_name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'RoomLocation'
    });

    return RoomLocation;
};

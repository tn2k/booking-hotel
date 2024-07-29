'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class RoomAmenity extends Model { }

    RoomAmenity.init({
        room_amenity_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        room_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Room',
                key: 'room_id'
            }
        },
        amenity_name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'RoomAmenity'
    });

    RoomAmenity.associate = (models) => {
        RoomAmenity.belongsTo(models.Room, { foreignKey: 'room_id' });
    };

    return RoomAmenity;
};

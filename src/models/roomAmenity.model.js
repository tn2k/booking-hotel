'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class RoomAmenity extends Model { }

    RoomAmenity.init({
        room_amenity_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
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
        RoomAmenity.belongsTo(models.Rooms, { foreignKey: 'room_id' });
    };

    return RoomAmenity;
};

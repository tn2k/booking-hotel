'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class RoomImages extends Model { }

    RoomImages.init({
        image_id: {
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
        url: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'RoomImages'
    });

    RoomImages.associate = (models) => {
        RoomImages.belongsTo(models.Rooms, { foreignKey: 'room_id' });
    };

    return RoomImages;
};
